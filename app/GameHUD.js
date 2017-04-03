/**
 * This class represents the game hud.  Displays information about the current overall state of the game.
 * Players, points, game time, phase time, status effects, and prompts.
 */

var GameHUD = function () {

    this.timerTextStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 24,
        fontWeight: 'bold',
        fill: ['#ffffff', '#00ff99'],
        stroke: '#4a1850',
        strokeThickness: 3,
        dropShadow: true,
        dropShadowColor: '#ffffff',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 2,
        wordWrap: true,
        wordWrapWidth: 440,
        align:'center'
    });

    this.playerNameStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 16,
        fontWeight: 'bold',
        fill: ['#ffaabb', '#ff9900'],
        stroke: '#4a1850',
        strokeThickness: 3,
        dropShadow: true,
        dropShadowColor: '#ffffff',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 2,
        wordWrap: true,
        wordWrapWidth: 440
    });

    this.playerPointsStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 16,
        fontWeight: 'bold',
        fill: ['#ffaabb', '#ff9900'],
        stroke: '#4a1850',
        strokeThickness: 3,
        dropShadow: true,
        dropShadowColor: '#ffffff',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 2,
        wordWrap: true,
        wordWrapWidth: 440
    });

    this.promptStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 32,
        fontWeight: 'bold',
        fill: ['#ff0000', '#ff9900'],
        stroke: '#4a1850',
        strokeThickness: 1,
        dropShadow: true,
        dropShadowColor: '#ffffff',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 2,
        wordWrap: true,
        wordWrapWidth: 440,
        align: 'center'
    });

    this.defaultSectionPadding = 15;
}

GameHUD.prototype = {

    createHUDObjects: function () {
        this.HUDContainer = new PIXI.Container();
        this.playersContainer = new PIXI.Container();

        this.txt_totalGameTime = new PIXI.Text('Time Remaining:', this.timerTextStyle);

        this.txt_currentGameTime = new PIXI.Text('Game Time:', this.timerTextStyle);
        this.txt_currentGameTime.x = (gEngine.renderer.width / 2) - (this.txt_currentGameTime.width / 2);
        this.txt_currentGameTime.y = 50 + this.defaultSectionPadding;

        this.txt_prompt = new PIXI.Text('', this.promptStyle);
        this.txt_prompt.x = this.txt_currentGameTime.x;
        this.txt_prompt.y = 400;
        
        this.HUDContainer.addChild(this.playersContainer);
        this.HUDContainer.addChild(this.txt_totalGameTime);
        this.HUDContainer.addChild(this.txt_currentGameTime);
        this.HUDContainer.addChild(this.txt_prompt);
        
        this.playersElements = [];
    },

    showHUD: function () {
        gEngine.stage.addChild(this.HUDContainer);
    },

    hideHUD: function () {
        gEngine.stage.removeChild(this.HUDContainer);
    },

    addPlayerElement: function (player) {
        var newPlayerElement = new PIXI.Container();
        
        var xPos = (this.playersElements.length) * 200;

        newPlayerElement.playerName = new PIXI.Text(player.name, this.playerNameStyle);
        newPlayerElement.playerPoints = new PIXI.Text(player.points, this.playerPointsStyle);

        newPlayerElement.playerAvatar = new PIXI.Graphics();

        newPlayerElement.playerAvatar.beginFill(player.color);
        newPlayerElement.playerAvatar.lineStyle(1, player.color, 1);
        newPlayerElement.playerAvatar.drawRect(0, 0, 75, 75);
        newPlayerElement.playerAvatar.endFill();

        newPlayerElement.playerName.x = 75;
        newPlayerElement.playerName.y = 0;
        newPlayerElement.playerPoints.x = 75;
        newPlayerElement.playerPoints.y = 25;
        newPlayerElement.playerAvatar.x = 0;
        newPlayerElement.playerAvatar.y = 0;
        newPlayerElement.x = xPos;
        newPlayerElement.y = 0;

        newPlayerElement.addChild(newPlayerElement.playerAvatar);
        newPlayerElement.addChild(newPlayerElement.playerName);
        newPlayerElement.addChild(newPlayerElement.playerPoints);
        

        this.playersElements.push(newPlayerElement);
        this.playersContainer.addChild(newPlayerElement);

        var center = gEngine.renderer.width / 2;
        var totalWidth = this.playersElements.length *200;
        this.playersContainer.x = center - (totalWidth/2);
    },

    removePlayerElement: function(player) {
        
    },

    reset: function(){
        while(this.playersElements.length > 0){
            this.playersContainer.removeChild(this.playersElements[0]);
            this.playersElements.splice(0, 1);
        }
    },

    setPrompt: function(newPrompt){
        this.txt_prompt.visible = true;
        this.txt_prompt.text = newPrompt;

        setTimeout(function(){ this.txt_prompt.visible = false; }.bind(this), 1500);
    },

    update: function() {
        this.txt_totalGameTime.text = "Game " + (gEngine.minigameManager.currentMinigameIndex + 1) + " out of " + gEngine.minigameManager.minigameList.length;
        this.txt_currentGameTime.text = "Game Time: " + Math.floor(gEngine.minigameManager.maxMinigameTime - gEngine.minigameManager.currentMinigameTime);

        for(var i = 0; i < this.playersElements.length; i++){
            var curPlayer =  gEngine.minigameManager.players[i];
            var curElement = this.playersElements[i];

            curElement.playerPoints.text = curPlayer.points;
            curElement.playerName.text = curPlayer.name;
        }
    },
}