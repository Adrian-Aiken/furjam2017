"use strict";

var GAME_LIST = ["ExampleGame"];

var gEngine, assMan;
var minigames = [];

define(['jquery', 'underscore', 'pixi', 'audio', 'gamepad', 'player', 'engine', 'minigame', 'assetmanager'].concat(GAME_LIST), function ($, _) {
    assMan = new AssetManager();
    
    _.each(GAME_LIST, (gameName) => {
        var game = eval(gameName);
        
        minigames.push(new Minigame(game));
        _.each(game.Assets.Sprites, (spriteDef) => {
            assMan.AddTexture(spriteDef);
        });

        console.log("Pushed: " + game.name);
    });

    assMan.LoadAssets();

    gEngine = new Engine();
    gEngine.start();
    var testGamepad = new PlayerGamepad(true, Player1_keys, 0, gEngine.gamepadManager);
    minigames[0].init(testGamepad, gEngine.stage);

    var loopCount = 0;
    var minigameLoop = setInterval(function() {
        minigames[0].update();
        loopCount++;

        if (loopCount >= 30*5) {
            clearInterval(minigameLoop);
            minigames[0].finish();
        }
    }, 1000/60);
    

});