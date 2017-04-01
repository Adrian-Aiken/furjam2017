/**
 * This class maintains the list of minigames available for the game type, and handles transitions between them and any modifiers
 * Also maintains a list of players.
 */

var MinigameManager = function (_allMinigames) {
    this.minigameList = [];
    this.players = [];
    this.currentPlayers = [];
    this.allMinigames = _allMinigames;
    this.currentMinigameIndex = -1;
    this.currentMinigameTime = 0;
    this.totalTime = 0;
    this.bIsRunning = false;
}

MinigameManager.prototype = {

    testGameType: function () {
        this.setOptions(30, 4500, 15, 2, false);
        this.initDebugPlayers();
        this.startGame();
    },

    setOptions: function (_maxMinigameTime, _maxTotalGameTime, _numTotalRounds, _numPlayers, _statusEffectsEnabled) {
        this.maxMinigameTime = _maxMinigameTime;
        this.maxTotalGameTime = _maxTotalGameTime;
        this.totalRounds = _numTotalRounds;
        this.numPlayers = _numPlayers;
        this.statusEffectsEnabled = _statusEffectsEnabled;
    },

    //This will be removed once we have a player join screen
    initDebugPlayers: function () {
        for (var i = 0; i < this.numPlayers; i++) {
            this.addPlayer("Player " + i, "#FFFFFF", {});
        }
    },

    addPlayer: function (name, color, avatar) {
        var player = new Player(name, color, avatar);
        this.players.push(player);
    },

    selectNextPlayers: function (numPlayers) {
        var nextPlayers = [];
        for (var i = 0; i < this.players.length; i++) {
            var curPlayer = this.players[i];
            if (this.currentPlayers.indexOf(curPlayer) < 0) {
                curPlayer.setGamepadIndex(nextPlayers.length);
                nextPlayers.push(curPlayer);
            }
            if (nextPlayers.length >= numPlayers) {
                break;
            }
        }
        this.currentPlayers = nextPlayers;
    },

    startGame: function () {
        this.initializeMinigames();
        this.currentMinigameTime = 0;
        this.totalTime = 0;
        this.currentMinigameIndex = -1;
        this.bIsRunning = true;
        this.nextMinigame();
    },

    finishGame: function () {
        //bring up summary screen  
        this.bIsRunning = false;
        console.log("Finished all minigames! ");
    },

    //Initializes the list of minigames available
    initializeMinigames: function () {
        for (var i = 0; i < this.totalRounds; i++) {
            var randGame = Math.floor(Math.random() * this.allMinigames.length);
            var gameInstance = eval(this.allMinigames[randGame]);
            _.each(gameInstance.Assets.Sprites, (spriteDef) => {
                assMan.AddTexture(spriteDef);
            });
            this.minigameList.push(new Minigame(gameInstance));
        }
    },

    checkCurrentGameState: function (timeElapsed) {
        this.currentMinigameTime += timeElapsed;
        this.totalTime += timeElapsed;

        if (this.totalTime >= this.maxTotalGameTime) {
            this.finishGame();
        }
        else if (this.currentMinigame.bIsFinished || this.currentMingameTime >= this.maxMinigameTime) {
            this.nextMinigame();
        }
    },

    nextMinigame: function () {
        this.currentMinigameTime = 0;
        this.currentMinigameIndex++;
        this.currentMinigame = this.minigameList[this.currentMinigameIndex];
        this.selectNextPlayers(this.currentMinigame.numPlayers);
        this.currentMinigame.init(this.currentPlayers, gEngine.stage);
        console.log("Initialized minigame " + this.currentMinigameIndex);
        gEngine.gameState = this.currentMinigame.update.bind(this.currentMinigame);
    }
}