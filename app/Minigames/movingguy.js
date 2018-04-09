/**
 * Moving guy
 */

var MovingGuy = {
    Name: "Movie Guy",
    Author: "Adrian Aiken",
    Prompt: "Take the picture!",
    NumPlayers: 1,

    Assets: {
        Sprites: [
            { Name: "movingguy", FileName: "movingguy.jpg" },
            { Name: "mg_background", FileName: "movingguy_background.jpg" },
            { Name: "checkmark", FileName: "checkmark.png" },
            { Name: "incorrect", FileName: "incorrect.png" }
        ],
        Sounds: []
    },

    Initialize: function (players, stage, duration) {
        console.log("Initialized Movingguy game");
        this.players = players;
        this.stage = stage;

        // Set up assets
        var background = assMan.GetSprite("mg_background");
        background.width = window.innerWidth;
        background.height = window.innerHeight;
        stage.addChild(background);

        this.dgSprite = assMan.GetSprite("movingguy");
        this.dgSprite.y = (window.innerHeight - this.dgSprite.height) / 2;
        this.dgSprite.x = window.innerWidth;
        stage.addChild(this.dgSprite);

        this.checkmark = assMan.GetSprite("checkmark");
        this.checkmark.x = -1000000;
        this.checkmark.y = -1000000;
        this.stage.addChild(this.checkmark);

        this.incorrect = assMan.GetSprite("incorrect");
        this.incorrect.x = -1000000;
        this.incorrect.y = -1000000;
        this.stage.addChild(this.incorrect);

        // Set up initial game state
        this.playerActed = false;
        this.playerWon = false;
        this.countdown = (Math.random() * -5) - 2;
        this.winTime = 1;
    },

    Update: function (deltaTime) {
        // Update guy showing up
        this.countdown += deltaTime;
        this.dgSprite.y = (window.innerHeight - this.dgSprite.height) / 2;

        if (this.countdown >= 0 && !this.playerWon) {
            this.dgSprite.x = window.innerWidth - ((window.innerWidth / this.winTime) * this.countdown);
        }

        if (this.countdown >= this.winTime * 2) {
            this.bIsFinished = true;
        }

        // Update player input
        if (!this.playerActed) {
            if (this.players[0].myGamepad.a_btn()) {
                this.playerActed = true;

                if (this.countdown >= 0 && this.countdown <= this.winTime) {
                    this.playerWon = true;

                    this.checkmark.x = (window.innerWidth - this.checkmark.width) / 2;
                    this.checkmark.y = (window.innerHeight - this.checkmark.height) / 2;
                } else {
                    this.incorrect.x = (window.innerWidth - this.incorrect.width) / 2;
                    this.incorrect.y = (window.innerHeight - this.incorrect.height) / 2;
                }
            }
        }
    },

    Finish: function () {
        if (this.playerWon) {
            this.players[0].points += 50;
        }
        console.log("Game finished! " + this.playerWon);
        return this.playerWon;
    }
}