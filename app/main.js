"use strict";

var GAME_LIST = ["ExampleGame"];

var gEngine;
var minigames = [];

define(['jquery', 'underscore', 'pixi', 'audio', 'engine', 'minigame'].concat(GAME_LIST), function ($, _) {
    gEngine = new Engine();
    gEngine.start();

    _.each(GAME_LIST, (gameName) => {
        var game = eval(gameName);
        
        minigames.push(new Minigame(game))
    })

    console.log(minigames);
});