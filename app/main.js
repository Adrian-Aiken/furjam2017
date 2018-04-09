"use strict";

//var GAME_LIST = ["ExampleGame", "MovingGuy", "MashA"];
var GAME_LIST = ["MashA"];

var gEngine, assMan;

define(['jquery', 'underscore', 'pixi', 'audio', 'gamepad', 'player', 'engine', 'minigame', 'minigameManager', 'assetmanager', 'hud', 'startScreen', 'summaryScreen'].concat(GAME_LIST), function ($, _) {
    assMan = new AssetManager();

    gEngine = new Engine();
    gEngine.start();
});