/**
 * Example game; very basic
 */

var ExampleGame = {
    /** Required feilds for the Minigame object */
    Name: "Example Game",
    Author: "Goatie",
    Prompt: "Press a button!",

    Assets: ["Spritesheets/icon.jpg"],
    
    Initialize: function() {
        console.log("Initalized Example game");
        this.buttonPressed = false;
    },

    Update: function(gamepad, frameNum) {
        if (gamepad.a_btn()) {
            this.buttonPressed = true;
            console.log("It worked!");
        }
    },

    Finish: function() {
        console.log("Game over");
        return this.buttonPressed;
    }
};