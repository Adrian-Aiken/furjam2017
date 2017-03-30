"use strict";

var GAME_LIST = ["ExampleGame"];

var gEngine;
var minigames = [];

define(['jquery', 'underscore', 'pixi', 'audio', 'gamepad', 'engine', 'minigame'].concat(GAME_LIST), function ($, _) {
    gEngine = new Engine();
    gEngine.start();
    
    _.each(GAME_LIST, (gameName) => {
        var gameManifest = eval(gameName);
        var game = new Minigame(gameManifest);

        if (game.Assets.Sprites) {
            PIXI.loader.add(game.Assets.Sprites).load(game.loadAssets);
            console.log("Loaded assets: " + game.Assets.Sprites);
        }

        minigames.push(game);

        console.log("Pushed: " + minigames[0].name);
    });

    var testGamepad = new PlayerGamepad(true, Player1_keys);

    // Initialization
    var gameToPlay = minigames[0];
    gameToPlay.init(testGamepad, gEngine.stage);

    // Start game loop
    gEngine.gameState = gameToPlay.update.bind(gameToPlay);

    /*var loopCount = 0;
    var minigameLoop = setInterval(function() {
        //minigames[0].update(pad, loopCount);
        loopCount++;

        if (loopCount >= 30*5) {
            clearInterval(minigameLoop);
            minigames[0].finish();
        }
    }, 1000/60);*/

});