require.config({
    baseUrl: "../app",
    paths: {
        //Libraries
        jquery: "lib/jquery-3.1.1",
        pixi: "lib/pixi.min",
        audio:"lib/howler.min",
        underscore: "lib/underscore",

        // Locally required classes
        engine: "GameEngine",
        minigame: "Minigame",
        minigameManager: "MinigameManager",
        gamepad: "Gamepad",
        player: "Player",
        assetmanager: "AssetManager",
        hud: "GameHUD",

        //***** GAME LIST - Put game here *****
        ExampleGame: "Minigames/example",
        DiaperGuy: "Minigames/diaperguy"
    }
});

requirejs(['main']);