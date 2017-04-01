/**
 *  Contains code for loading assets, initializing renderers, and the main update loop
 */

var Engine = function () {
    this.gameState = function () { };

    this.assetLoadQueue = [];
    this.sprites = {};
    this.audioClips = {};

    this.lastUpdateTime = Date.now();

    var type = "WebGL";
    if (!PIXI.utils.isWebGLSupported()) {
        type = "canvas";
    }

    PIXI.utils.sayHello(type);

    this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { antialias: true, transparent: false, resolution: 1, autoResize: true });

    document.body.appendChild(this.renderer.view);

    this.stage = new PIXI.Container();

    this.gamepadManager = new GamepadManager();

    var GAME_LIST = ["ExampleGame"];    //TEMP
    this.minigameManager = new MinigameManager(GAME_LIST);
};

Engine.prototype = {

    start: function () {
        this.update();
    },

    update: function () {
        var deltaTime = (Date.now() - this.lastUpdateTime) / 1000.0;
        //console.log("Update Frame.  dT = " + deltaTime);

        requestAnimationFrame(this.update.bind(this));

        //Update gamepad button states
        this.gamepadManager.pollConnectedGamepads();

        if (this.gameState != null) {
            this.gameState();
        }

        //todo: web worker for render thread
        this.render();

        if(this.minigameManager.bIsRunning){
            //Checks whether or not the current minigame is finished, then progresses to the next game or ends the game
            this.minigameManager.checkCurrentGameState(deltaTime);
        }

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
        this.audioClips[_friendlyName] = new Howl({
            src: _filePath,
            autoplay: _autoPlay,
            onload: this.onAudioLoaded.bind(this)
        });
    },

    onAudioLoaded: function () {
        console.log("Loaded Audio" + this);
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
        var audio = this.audioClips["testMusic"];

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

        if (audio != null) {
            if (audio.audioAngleHoriz == undefined) {
                audio.audioAngleHoriz = 0;
            }
            if (audio.audioPos == undefined) {
                audio.audioPos = { x: 0, y: 0, z: 0 };
            }

            audio.audioAngleHoriz += 0.09;
            audio.audioPos.x = Math.cos(audio.audioAngleHoriz);
            audio.audioPos.y = Math.sin(audio.audioAngleHoriz);

            audio.pos(audio.audioPos.x, audio.audioPos.y, audio.audioPos.z);

            console.log(audio.audioAngleHoriz + ", " + audio.audioPos.x + ", " + audio.audioPos.y);
        }

        console.log(gEngine.gamepadManager.getButtonPressed(0, gEngine.gamepadManager.defaultGamepadMapping.buttons.A));
        console.log(gEngine.gamepadManager.getAxisValue(0, gEngine.gamepadManager.defaultGamepadMapping.axes.LeftStickHorizontal));
    }
}