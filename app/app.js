require.config({
    baseUrl: "../app",
    paths: {
        backbone: "lib/backbone",
        jquery: "lib/jquery-3.1.1",
        pixi: "lib/pixi.min",
        audio:"lib/pixi-audio",
        underscore: "lib/underscore",
        engine: "GameEngine",
    }
});

requirejs(['main']);