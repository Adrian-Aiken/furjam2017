/**
 *  Contains code for loading assets, initializing renderers, and the main update loop
 */

var Engine = function () {
    this.gameState = function () { };

    this.assetLoadQueue=[];
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
        for (var i = 0; i < loadedData.numFrames; ++i) {
            var val = i < 10 ? '0' + i : i;

            frames.push(PIXI.Texture.fromFrame(loadedData.frameName + val + ".png"));
        }

        var anim = new PIXI.extras.AnimatedSprite(frames);

        this.sprites[loadedData.friendlyName] = anim;
    },

    assetLoadedCallback: function (loader, resource) {

    },

    addSpriteToStage: function () {
        var sprite = new PIXI.Sprite(PIXI.loader.resources["../assets/icon.jpg"].texture);
        stage.addChild(sprite);
    },

    testAnimationSpriteSheet: function () {
        this.loadNewSpriteSheet("testAnim", "testSequence", "../assets/icon.json", 30);
        this.gameState = this.testGameState;
    },

    testGameState: function () {
        if (this.sprites["testAnim"] != null && this.sprites["testAnim"].added == false) {
            this.stage.addChild(this.sprites["testAnim"]);
        }
    }
}