"use strict";

var GAME_LIST = ["ExampleGame"];

var gEngine;
var pad;
var minigames = [];

define(['jquery', 'underscore', 'pixi', 'audio', 'engine', 'minigame', 'gamepad'].concat(GAME_LIST), function ($, _) {
    _.each(GAME_LIST, (gameName) => {
        var game = eval(gameName);
        
        minigames.push(new Minigame(game));
    });

    gEngine = new Engine();
    gEngine.start();

    pad = new Gamepad(Player1_keys);
});