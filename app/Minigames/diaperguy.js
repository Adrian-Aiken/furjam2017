/**
 * Diaper guy. We must all remember RF 2015
 */

var DiaperGuy = {
    Name: "Diaper Pup",
    Author: "Goatie",
    Prompt: "Take the picture!",
    NumPlayers: 1,

    Assets: {
        Sprites: [
            { Name: "diaperguy", FileName: "diaperguy.jpg" },
            { Name: "dg_background", FileName: "diaperguy_background.jpg" }
        ],
        Sounds: []
    },

    Initialize: function (players, stage, duration) {
        console.log("Initialized Diaperguy game");
        this.players = players;
        this.stage = stage;

        // Set up assets
        var background = assMan.GetSprite("dg_background");
        background.width = window.innerWidth;
        background.height = window.innerHeight;
        stage.addChild(background);

        this.dgSprite = assMan.GetSprite("diaperguy");
        this.dgSprite.y = (window.innerHeight - this.dgSprite.height) / 2;
        this.dgSprite.x = window.innerWidth;
        stage.addChild(this.dgSprite);

        // Set up initial game state
        this.playerActed = false;
        this.playerWon = false;
        this.countdown = (Math.random() * -5) - 2;
        this.winTime = 1.5;
    },

    Update: function(deltaTime) {
        // Update guy showing up
        this.countdown += deltaTime;
        this.dgSprite.y = (window.innerHeight - this.dgSprite.height) / 2;
        console.log("Countdown: " + this.countdown);
        if (this.countdown >= 0) {
            this.dgSprite.x = window.innerWidth - ((window.innerWidth/this.winTime) * this.countdown);
        }

        if (this.countdown >= this.winTime * 2) {
            this.bIsFinished = true;
        }

        // Update player input
        if (!this.playerActed) {
            if (this.players[0].myGamepad.a_btn()) {
                this.playerActed = true;

                if (countdown >= 0 && countdown <= this.winTime) {
                    this.playerWon = true;
                }
            }
        }
    },

    Finish: function() {
        return this.playerWon;
    }
}