/**************************  UTILS ***********************************/

var utils = function(PIXI)
{
    this.PIXI = PIXI;
    this.isHTMLAudioSupported = !!window.Audio,
    this.webAudioContext = window.AudioContext || window.webkitAudioContext,
    this.isWebAudioSupported = !!this.webAudioContext,
    this.isAudioSupported = this.isWebAudioSupported || this.isHTMLAudioSupported,
    this.isMp3Supported = false,
    this.isOggSupported = false,
    this.isWavSupported = false,
    this.isM4aSupported = false,
    this.createGainNode = null,
    this.globalWebAudioContext = this.isWebAudioSupported ? new this.webAudioContext() : null;

    if(this.isAudioSupported){
        let audio = document.createElement("audio");
        isMp3Supported = audio.canPlayType('audio/mpeg;') !== "";
        isOggSupported = audio.canPlayType('audio/ogg; codecs="vorbis"') !== "";
        isWavSupported = audio.canPlayType('audio/wav') !== "";
        isM4aSupported = audio.canPlayType('audio/mp4; codecs="mp4a.40.5"') !== "";

        //Add some config to the pixi loader
        if(isMp3Supported)this._setAudioExt("mp3");
        if(isOggSupported)this._setAudioExt("ogg");
        if(isWavSupported)this._setAudioExt("wav");
        if(isM4aSupported)this._setAudioExt("m4a");

        if(this.isWebAudioSupported){
          this.createGainNode = function createGainNode(ctx){
            return ctx.createGain ? ctx.createGain() : ctx.createGainNode();
          }
        }
     }
}

utils.prototype = {
/* TODO: Figure out why PIXI is undefined here */
    _setAudioExt:function(ext){
      if(this.isWebAudioSupported){
        this.PIXI.loaders.Resource.setExtensionXhrType(ext, this.PIXI.loaders.Resource.XHR_RESPONSE_TYPE.BUFFER);
      }else{
        this.PIXI.loaders.Resource.setExtensionLoadType(ext, this.PIXI.loaders.Resource.LOAD_TYPE.AUDIO);
      }
    }
}


/*********************************** AUDIO MANAGER **************************************/
var AudioManager = function(utils)
{
    this.enabled = utils.isAudioSupported;
    this.sounds = [];

    if(utils.isWebAudioSupported){
        this.context = utils.globalWebAudioContext;
        this.gainNode = utils.createGainNode(this.context);
        this.gainNode.connect(this.context.destination);
    }
}

AudioManager.prototype = {
  audios:{},

  getAudio:function(name){
    let audio = new Audio(this.audios[name], this);
    this.sounds.push(audio);
    return audio;
  },

  removeAudio:function(audio){
    let index = this.sounds.indexOf(audio);
    if(index !== -1){
      this.sounds.splice(index, 1);
    }
  },

  filterAudios:function(id, value){
    let audios = [];
    let len = this.sounds.length;
    let emptyValue = typeof value === "undefined";

    for(let i = 0; i < len; i++){
      if((emptyValue && !!this.sounds[i][id])||(!emptyValue && this.sounds[i][id] === value)){
        audios.push(this.sounds[i]);
      }
    }

    return audios;
  },

  mute:function(value){
    value = (value !== false);
    let len = this.sounds.length;
    for(let i = 0; i < len; i++)this.sounds[i].muted = value;
  },

  unmute:function(){
    return this.mute(false);
  },

  pause: function(value){
    value = (value !== false);
    let len = this.sounds.length;
    for(let i = 0; i < len; i++)this.sounds[i].paused = value;
  },

  resume: function(){
    return this.pause(false);
  }

}
  

/************************************************ AUDIO PARSER *********************************/

const _allowedExt = ["m4a", "ogg", "mp3", "wav"];

function audioParser(){
  return function(resource, next){
    if(!utils.isAudioSupported || !resource.data)return next();

    let ext = _getExt(resource.url);
    if(_allowedExt.indexOf(ext) === -1 || !_canPlay(ext))return next();

    let name = resource.name || resource.url;
    if(utils.isWebAudioSupported){
      utils.globalWebAudioContext.decodeAudioData(resource.data, (buffer)=>{
        AudioManager.audios[name] = buffer;
        next();
      });
    }else{
      AudioManager.audios[name] = resource.data;
      return next();
    }
  }
}

function audioUrlParser(resourceUrl){
  let url;
  for(let i = 0; i < resourceUrl.length; i++){
    let ext = _getExt(resourceUrl[i]);
    if(_allowedExt.indexOf(ext) === -1)break;
    if(_canPlay(ext)){
      url = resourceUrl[i];
      break;
    }
  }

  return url;
}

function _getExt(url){
  return url.split('?').shift().split('.').pop().toLowerCase();
}

function _canPlay(ext){
  let canPlay = false;
  switch(ext){
    case "m4a": canPlay = utils.isM4aSupported; break;
    case "mp3": canPlay = utils.isMp3Supported; break;
    case "ogg": canPlay = utils.isOggSupported; break;
    case "wav": canPlay = utils.isWavSupported; break;
  }

  return canPlay;
}


/********************************* AUDIO *****************************/

var PIXIAudio = function(data, manager){
    this.prototype = PIXI.utils.EventEmitter.prototype;
    //super();
    this.manager = manager;
    this.data = data;

    if(!utils.isWebAudioSupported){
      this.audio = new window.Audio();
      this.audio.addEventListener('ended', this._onEnd.bind(this));
    }

    this._loop = false;
    this._paused = false;
    this._muted = false;
    this._volume = 1;

    this._startTime = 0;
    this._lastPauseTime = 0;
    this._offsetTime = 0;

    this.playing = false;
};



PIXIAudio.prototype = {
  play:function(pause){
    if((!pause && this.paused) || (!pause && this.playing)) return this;
    this.playing = true;
    this.emit('play');

    if(utils.isWebAudioSupported){
      this.audio = this.manager.context.createBufferSource();
      this.audio.start = this.audio.start || this.audio.noteOn;
      this.audio.stop = this.audio.stop || this.audio.noteOff;

      this.audio.buffer = this.data;
      this.audio.loop = this.loop;
      this._startTime = this.manager.context.currentTime;

      this.audio.onended = this._onEnd.bind(this);
      this.audio.gainNode = utils.createGainNode(this.manager.context);
      this.audio.gainNode.gain.value = this.muted ? 0 : this.volume;
      this.audio.gainNode.connect(this.manager.gainNode);

      this.audio.connect(this.audio.gainNode);
      this.audio.start(0, pause ? this._lastPauseTime : null);
    }else{
      this.audio.src = this.data.children[0].src;
      this.audio.preload = "auto";
      this.audio.volume = this.muted ? 0 : this.volume;
      this.audio.load();
      this.audio.play();
    }

    return this;
  },

  stop:function(){
    if(!this.playing)return this;

    if(utils.isWebAudioSupported){
      this.audio.stop(0);
    }else{
      this.audio.pause();
      this.audio.currentTime = 0;
    }
    this.playing = false;
    this.emit('stop');

    return this;
  },

  reset:function(){
    this._startTime = 0;
    this._lastPauseTime = 0;
    this._offsetTime = 0;

    this.playing = false;
    //if(utils.isWebAudioSupported)this.audio = null;
  },

  remove:function(){
    this.manager.removeAudio(this);
  },

  _onEnd:function(){
    if(!utils.isWebAudioSupported){
      if(this.loop){
        this.audio.currentTime = 0;
        this.audio.play();
      }else{
        this.reset();
        this.emit('end');
      }
    }else{
      if(!this.paused){
        this.reset();
        this.emit('end');
      }
    }
  },

  get paused(){return this._paused},
  set paused(value){
    if(value === this._paused)return;
    if(value){
      if(utils.isWebAudioSupported){
        this._offsetTime += this.manager.context.currentTime - this._startTime;
        this._lastPauseTime = this._offsetTime%this.audio.buffer.duration;
        if(this.audio)this.audio.stop(0);
      }else{
        if(this.audio)this.audio.pause();
      }
      this.emit('pause');
    }else{
      if(utils.isWebAudioSupported){
        this.play(true);
      }else{
        if(this.audio)this.audio.play();
      }
      this.emit('resume');
    }
    this._paused = value;
  },

  get loop(){return this._loop},
  set loop(value){
    if(value === this._loop)return;
    this._loop = value;
    if(utils.isWebAudioSupported&&this.audio){
      this.audio.loop = value;
    }
  },

  get volume(){return this._volume},
  set volume(value){
    if(value === this._volume)return;
    if(utils.isWebAudioSupported){
      if(this.audio)this.audio.gainNode.gain.value = this.muted ? 0 : this.volume;
    }else{
      if(this.audio)this.audio.volume = this.muted ? 0 : this.volume;
    }
    this._volume = value;
  },

  get muted(){return this._muted},
  set muted(value){
    if(value === this._muted)return;
    this._muted = value;
    if(utils.isWebAudioSupported){
      if(this.audio)this.audio.gainNode.gain.value = this._muted ? 0 : this.volume;
    }else{
      if(this.audio)this.audio.volume = this._muted ? 0 : this.volume;
    }
  }
}
