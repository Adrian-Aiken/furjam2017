"use strict";

var gEngine;

define(function (require) {
    // Required external Modules
    require('pixi');
    require('engine');

    gEngine = new Engine();
    gEngine.start();
});