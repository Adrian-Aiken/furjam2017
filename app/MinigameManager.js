/**
 * This class maintains the list of minigames available for the game type, and handles transitions between them and any modifiers
 * Also maintains a list of players.
 */

var MinigameManager = function (_allMinigames) {
    this.minigameList = [];
    this.players = [];
    this.currentPlayers = [];
    this.nextPlayerIndex = 0;
    this.allMinigames = _allMinigames;
    this.currentMinigameIndex = -1;
    this.currentMinigameTime = 0;
    this.totalTime = 0;
    this.bIsRunning = false;
    this.minigameContainer = new PIXI.Container();
}

MinigameManager.prototype = {

    testGameType: function () {
        this.setOptions(30, 4500, 15, 3, false);
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

        if(gEngine && gEngine.gameHUD){
            gEngine.gameHUD.addPlayerElement(player);
        }
    },

    selectNextPlayers: function (numPlayers) {
        var nextPlayers = [];
        for (var i = 0; i < numPlayers; i++) {
            nextPlayers.push(this.players[this.nextPlayerIndex++]);
            this.nextPlayerIndex %= this.players.length;
            nextPlayers[i].setGamepadIndex(i);
        }
        this.currentPlayers = nextPlayers;
    },

    startGame: function () {
        this.initializeMinigames();
        this.currentMinigameTime = 0;
        this.totalTime = 0;
        this.currentMinigameIndex = -1;
        this.bIsRunning = true;
        //Need to add the minigameContainer so that the HUD will always show on top
        gEngine.stage.addChild(this.minigameContainer);
        if(gEngine && gEngine.gameHUD){
            gEngine.gameHUD.showHUD();
        }
        this.nextMinigame();
        
    },

    finishGame: function () {
        //bring up summary screen  
        this.bIsRunning = false;
        console.log("Finished all minigames! ");
        gEngine.stage.removeChild(this.minigameContainer);
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

        if (this.totalTime >= this.maxTotalGameTime || this.currentMinigameIndex >= this.minigameList.length - 1) {
            this.finishGame();
        }
        else if (this.currentMinigame.bIsFinished || this.currentMinigameTime >= this.maxMinigameTime) {
            this.nextMinigame();
        }
    },

    nextMinigame: function () {
        if(this.currentMinigame){
            this.currentMinigame.finish();
        }
        this.currentMinigameTime = 0;
        this.currentMinigameIndex++;
        this.currentMinigame = this.minigameList[this.currentMinigameIndex];
        this.selectNextPlayers(this.currentMinigame.numPlayers);
        this.currentMinigame.init(this.currentPlayers, this.minigameContainer, this._maxMinigameTime);
        console.log("Initialized minigame " + this.currentMinigameIndex);
        gEngine.gameState = this.currentMinigame.update.bind(this.currentMinigame);
        gEngine.gameHUD.setPrompt(this.currentMinigame.prompt);
    }
}