/**
 * Represents the summary screen to be shown at the end of a round of minigames.
 * Displays all players and their scores, with explanations, as well as the winner.
 */

 var SummaryScreen = function() {
     this.screenContainer = new PIXI.Container();

     this.createScreenObjects();
 }

 SummaryScreen.prototype = {
     
     createScreenObjects: function(){
         var winner = gEngine.minigameManager.getWinner();

         var winnerText = new PIXI.Text(winner.name + " is the winner!");

         winnerText.x = gEngine.renderer.width / 2;
         winnerText.y = gEngine.renderer.height / 2;
         this.screenContainer.addChild(winnerText);

         var instructionText = new PIXI.Text("Press A to play with the same players.  Press B to restart");
         instructionText.x = gEngine.renderer.width / 2;
         instructionText.y = gEngine.renderer.height - 100;
         this.screenContainer.addChild(instructionText);

         gEngine.stage.addChild(this.screenContainer);
     },

     update: function(dT){
         if(this.bReadyToContinue){
            var gamepads = gEngine.gamepadManager.gamepads;
            for(var i = 0; i < gamepads.length; i++){
                if(gEngine.gamepadManager.getButtonPressed(i, gEngine.gamepadManager.defaultGamepadMapping.buttons.A)){
                    gEngine.minigameManager.startGame();
                }
                else if(gEngine.gamepadManager.getButtonPressed(i, gEngine.gamepadManager.defaultGamepadMapping.buttons.B)){
                    gEngine.restart();
                }
            }
         }
     },
 }