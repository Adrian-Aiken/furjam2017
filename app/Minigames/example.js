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
        Sprites: [ 
            { Name: "checkmark", FileName: "checkmark.png"},
            { Name: "incorrect", FileName: "incorrect.png"}
        ],
        Sounds: []
    },

    Initialize: function (players, stage) {
        console.log("Initalized Example game");
        this.buttonPressed = false;
        this.players = players;
        this.pad = players[0].myGamepad;
        this.stage = stage;
    },

    Update: function() {
        if (!this.checkmark) this.checkmark = assMan.GetSprite("checkmark");

        if (this.pad.a_btn()) {
            this.buttonPressed = true;
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