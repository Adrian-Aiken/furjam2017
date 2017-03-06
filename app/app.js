require.config({
    baseUrl: "../app",
    paths: {
        backbone: "lib/backbone",
        jquery: "lib/jquery-3.1.1",
        pixi: "lib/pixi.min",
        underscore: "lib/underscore",
        engine: "GameEngine",
    }
});

requirejs(['main']);