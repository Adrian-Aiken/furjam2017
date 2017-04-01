/**
 * Example game; very basic
 */

var ExampleGame = {
    /** Required feilds for the Minigame object */
    Name: "Example Game",
    Author: "Goatie",
    Prompt: "Press a button!",
    NumPlayers: 1,

    /** List of assets and initialization of them */
    Assets: {
        //Sprites: ["../assets/Spritesheets/checkmark.png", "../assets/Spritesheets/incorrect.png"],
        Sprites: [],
        Sounds: []
    },

    /** Called when the game loads, to allow for pre-loading of assets
    *  These assets should not change during the life of your game.
    */
    OnLoad: function () {
        //this.checkmark = new PIXI.Sprite(PIXI.loader.resources["../assets/Spritesheets/checkmark.png"].texture);
        //this.incorrect = new PIXI.Sprite(PIXI.loader.resources["../assets/Spritesheets/incorrect.png"].texture);
    },

    Initialize: function (players, stage) {
        console.log("Initalized Example game");
        this.buttonPressed = false;
        this.players = players;
        this.pad = players[0].myGamepad;
        this.stage = stage;
    },

    Update: function () {
        if (this.pad.a_btn()) {
            this.buttonPressed = true;
            this.checkmark = PIXI.Sprite.fromImage("../assets/Spritesheets/checkmark.png");
            this.stage.addChild(this.checkmark);
            this.bIsFinished = true;
            console.log("It worked!");
        }
    },

    Finish: function () {
        console.log("Game over");
        return this.buttonPressed;
    }
};