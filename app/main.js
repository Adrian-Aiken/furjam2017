"use strict";

//var GAME_LIST = ["ExampleGame", "DiaperGuy"];
var GAME_LIST = ["MashA"];

var gEngine, assMan;

define(['jquery', 'underscore', 'pixi', 'audio', 'gamepad', 'player', 'engine', 'minigame', 'minigameManager', 'assetmanager', 'hud'].concat(GAME_LIST), function ($, _) {
    assMan = new AssetManager();

    gEngine = new Engine();
    gEngine.start();
});