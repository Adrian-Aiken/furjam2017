/**
 * Very basic a-button mashing minigame
 */

var MashA = {
    Name: "Mash A",
    Author: "Goatie",
    Prompt: "Press A a bunch!",
    NumPlayers: 2,

    Assets: {
        Sprites: [],
        Sounds: []
    },

    Initialize: function (players, stage, duration) {
        this.players = players;

        this.GOAL_PRESSES = 10;

        this.player1Presses = 0;
        this.player2Presses = 0;

        this.player1Pressing = false;
        this.player2Pressing = false;

        this.winner = -1;

        this.graphics = new PIXI.Graphics();
        stage.addChild(this.graphics);
    },

    Update: function (deltaTime) {
        // "COOLDOWN" function, after game over
        if (this.winner > -1) {            
            this.cooldownTime -= deltaTime;
            if (this.cooldownTime <= 0) {
                this.bIsFinished = true;
            }
            return
        }

        console.log("** Player 1 **     Pressing: " + this.player1Pressing + " Presses: " + this.player1Presses);
        console.log("** Player 2 **     Pressing: " + this.player2Pressing + " Presses: " + this.player2Presses);

        // Check to update button presses 
        if (this.player1Pressing && !this.players[0].myGamepad.a_btn())
            this.player1Pressing = false;
        if (!this.player1Pressing && this.players[0].myGamepad.a_btn()) {
            this.player1Pressing = true;
            this.player1Presses += 1;
        }

        if (this.player2Pressing && !this.players[1].myGamepad.a_btn())
            this.player2Pressing = false;
        if (!this.player2Pressing && this.players[1].myGamepad.a_btn()) {
            this.player2Pressing = true;
            this.player2Presses += 1;
        }

        // Check to update 'win' condition, and award win to proper player
        if (this.player1Presses >= this.GOAL_PRESSES) {
            this.winner = 0;
            this.cooldownTime = 3;
        } else if (this.player2Presses >= this.GOAL_PRESSES) {
            this.winner = 1;
            this.cooldownTime = 3;
        }

        // Update on-screen graphics
        this.graphics.clear();

        //Player 1
        this.graphics.lineStyle(2, 0x0000FF, 1);
        this.graphics.beginFill(0xFF700B, 1);
        this.graphics.drawRect(0, 0, window.innerWidth/2, (window.innerHeight/this.GOAL_PRESSES) * this.player1Presses);
        this.graphics.endFill();

        //Player 2
        this.graphics.lineStyle(2, 0xFF0000, 1);
        this.graphics.beginFill(0x0B70FF, 1);
        this.graphics.drawRect(window.innerWidth/2, 0, window.innerWidth/2, (window.innerHeight/this.GOAL_PRESSES) * this.player2Presses);
        this.graphics.endFill();
    },

    Finish: function() {
        if (this.winner > -1) {
            this.players[this.winner].points += 50;
        }
        return this.winner >= 0;
    }
}