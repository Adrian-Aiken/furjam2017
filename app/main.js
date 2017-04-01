"use strict";

var GAME_LIST = ["ExampleGame"];

var gEngine;
var minigames = [];

define(['jquery', 'underscore', 'pixi', 'audio', 'gamepad', 'player', 'engine', 'minigame'].concat(GAME_LIST), function ($, _) {
    _.each(GAME_LIST, (gameName) => {
        var game = eval(gameName);
        
        minigames.push(new Minigame(game));

        console.log("Pushed: " + minigames[0].name);
    });

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