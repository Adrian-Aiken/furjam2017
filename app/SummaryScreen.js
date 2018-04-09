/**
 * Represents the summary screen to be shown at the end of a round of minigames.
 * Displays all players and their scores, with explanations, as well as the winner.
 */

 var SummaryScreen = function() {
     this.screenContainer = new PIXI.Container();

     this.defaultStyle = new PIXI.TextStyle({
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

     this.createScreenObjects();
 }

 SummaryScreen.prototype = {
     
     createScreenObjects: function(){
         var winner = gEngine.minigameManager.getWinner();

         var winnerText = new PIXI.Text(winner.name + " is the winner!", this.defaultStyle);

         winnerText.x = gEngine.renderer.width / 2;
         winnerText.y = gEngine.renderer.height / 2;
         this.screenContainer.addChild(winnerText);

         var instructionText = new PIXI.Text("Press A to play with the same players.  Press B to restart", this.defaultStyle);
         instructionText.x = gEngine.renderer.width / 2;
         instructionText.y = gEngine.renderer.height - 100;
         this.screenContainer.addChild(instructionText);

         gEngine.stage.addChild(this.screenContainer);

         this.bReadyToContinue = true;
     },

     update: function(dT){
         if(this.bReadyToContinue){
            var gamepads = gEngine.gamepadManager.gamepads;
            for(var i = 0; i < gamepads.length; i++){
                if(gEngine.gamepadManager.getButtonPressed(i, gEngine.gamepadManager.defaultGamepadMapping.buttons.A)){
                    gEngine.stage.removeChild(this.screenContainer);
                    gEngine.minigameManager.startGame();
                }
                else if(gEngine.gamepadManager.getButtonPressed(i, gEngine.gamepadManager.defaultGamepadMapping.buttons.B)){
                    gEngine.stage.removeChild(this.screenContainer);
                    gEngine.restart();
                }
            }
         }
     },
 }