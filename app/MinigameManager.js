/**
 * This class maintains the list of minigames available for the game type, and handles transitions between them and any modifiers
 * Also maintains a list of players.
 */

var MinigameManager = function (_allMinigames) {
    this.minigameList = [];
    this.players = [];
    this.allMinigames = _allMinigames;
    this.currentMinigameIndex = -1;
    this.currentMinigameTime = 0;
    this.totalTime = 0;
    this.bIsRunning = false;
}

MinigameManager.prototype = {

    testGameType: function () {
        this.setOptions(30, 4500, 15, false);
        this.startGame();
    },

    setOptions: function (_maxMinigameTime, _maxTotalGameTime, _numTotalRounds, _statusEffectsEnabled) {
        this.maxMinigameTime = _maxMinigameTime;
        this.maxTotalGameTime = _maxTotalGameTime;
        this.totalRounds = _numTotalRounds;
        this.statusEffectsEnabled = _statusEffectsEnabled;
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
        this.currentMinigame.init();
        console.log("Initialized minigame " + this.currentMinigameIndex);
        gEngine.currentGameState = this.currentMinigame.update.bind(this.currentMinigame);
    }
}