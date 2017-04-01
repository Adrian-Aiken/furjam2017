/**
 * Example game; very basic
 */

var ExampleGame = {
    /** Required feilds for the Minigame object */
    Name: "Example Game",
    Author: "Goatie",
    Prompt: "Press a button!",

    /** List of assets and initialization of them */
    Assets: {
        Sprites: [ 
            { Name: "checkmark", FileName: "checkmark.png"},
            { Name: "incorrect", FileName: "incorrect.png"}
        ],
        Sounds: []
    },
    
    Initialize: function(playerGamepad, stage) {
        console.log("Initalized Example game");
        this.buttonPressed = false;
        this.pad = playerGamepad;
        this.stage = stage;
    },

    Update: function() {
        if (!this.checkmark) this.checkmark = assMan.GetSprite("checkmark");

        if (this.pad.a_btn()) {
            this.buttonPressed = true;
            this.checkmark = PIXI.Sprite.fromImage("../assets/Spritesheets/checkmark.png");
            this.stage.addChild(this.checkmark);
            console.log("It worked!");
        }
    },

    Finish: function() {
        console.log("Game over");
        return this.buttonPressed;
    }
};