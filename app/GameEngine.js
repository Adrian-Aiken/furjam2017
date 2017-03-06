/**
 *  Contains code for loading assets, initializing renderers, and the main update loop
 */

var Engine = function () {
    this.gameState = function () { };

    this.assetLoadQueue = [];
    this.sprites = {};

    this.lastUpdateTime = Date.now();

    var type = "WebGL";
    if (!PIXI.utils.isWebGLSupported()) {
        type = "canvas";
    }

    PIXI.utils.sayHello(type);

    this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { antialias: true, transparent: false, resolution: 1, autoResize: true });

    document.body.appendChild(this.renderer.view);

    this.stage = new PIXI.Container();

    /************************************ SET AUDIO OBJECT ON PIXI *************************************/
    

    var _utils = new utils(PIXI);
    var _AudioManager = new AudioManager(utils);
    var _Audio = new PIXIAudio({}, AudioManager);

    let audio = {
      utils : _utils,
      AudioManager : _AudioManager,
      Audio : _Audio,
      audioParser : audioParser
    };

    if(!PIXI.AudioManager){
      let Loader = PIXI.loaders.Loader;
      Loader.addPixiMiddleware(audioParser);

      let baseAdd = Loader.prototype.add;
      Loader.prototype.add = function(name, url, options, cb){
        if(typeof name === 'object'){
          if(Object.prototype.toString.call(name.url) === "[object Array]"){
            name.url = audioUrlParser(name.url);
          }
        }

        if(Object.prototype.toString.call(url) === "[object Array]"){
          url = audioUrlParser(url);
        }

        baseAdd.call(this, name, url, options, cb);
      };

      PIXI.audio = audio;
      PIXI.loader = new PIXI.loaders.Loader();
      PIXI.loaders.audioParser = audioParser;
      PIXI.audioManager = new AudioManager(audio.utils);
    }
};

Engine.prototype = {

    start: function () {
        this.update();
    },

    update: function () {
        var deltaTime = (Date.now() - this.lastUpdateTime);
        //console.log("Update Frame.  dT = " + deltaTime);

        requestAnimationFrame(this.update.bind(this));

        if (this.gameState != null) {
            this.gameState();
        }

        //todo: web worker for render thread
        this.render();

        this.lastUpdateTime = Date.now();
    },

    render: function () {
        //console.log("Render Frame");
        //todo: apply shaders?
        this.renderer.render(this.stage);
    },

    loadNewSpriteSheet: function (_friendlyName, _frameName, _filePath, _frames) {
        this.assetLoadQueue.push({ friendlyName: _friendlyName, frameName: _frameName, filePath: _filePath, frames: _frames });
        PIXI.loader
            .add(_friendlyName, _filePath)
            .load(this.onSpriteSheetLoaded.bind(this));
    },

    onSpriteSheetLoaded: function () {
        var loadedData = this.assetLoadQueue.pop();

        var frames = [];
        for (var i = 0; i < loadedData.frames; ++i) {
            var val = i < 10 ? '0' + i : i;

            frames.push(PIXI.Texture.fromFrame(loadedData.frameName + val + ".png"));
        }

        var anim = new PIXI.extras.AnimatedSprite(frames);

        anim.addedToStage = false;
        this.sprites[loadedData.friendlyName] = anim;
    },

    loadNewAudioFile: function (_friendlyName, _filePath, _tag, _autoPlay) {
        this.assetLoadQueue.push({ friendlyName: _friendlyName, filePath: _filePath, tag: _tag, autoPlay: _autoPlay });
        PIXI.loader
            .add([{ name: _friendlyName, url: _filePath}])
            .load(this.onAudioLoaded.bind(this));

    },

    onAudioLoaded: function () {
        var loadedData = this.assetLoadQueue.pop();
        console.log("PIXI Loaded " + loadedData.friendlyName);

        var loadedAudio = PIXI.audioManager.getAudio(loadedData.friendlyName);
        loadedAudio[loadedData.tag] = true;
        console.log("Audio object is " + loadedAudio);
        if (loadedData.autoPlay) {
            loadedAudio.play();
        }
    },

    testAnimationSpriteSheet: function () {
        this.loadNewSpriteSheet("testAnim", "testSequence00", "../assets/Spritesheets/icon.json", 30);
        this.gameState = this.testGameState;
    },

    testAudio: function () {
        this.loadNewAudioFile("testMusic", "../assets/Audio/Music/01 - The Hedonist (Original Mix).mp3", "music", true);
    },

    testGameState: function () {
        var anim = this.sprites["testAnim"];

        if (anim != null) {
            if (!anim.addedToStage) {
                this.stage.addChild(anim);
                anim.addedToStage = true;
                anim.play();
            }
            else {
                anim.x = (anim.x + 1) % (window.innerWidth - anim.width);
                anim.y = (anim.y + 1) % (window.innerHeight - anim.height);
            }
        }
    }
}