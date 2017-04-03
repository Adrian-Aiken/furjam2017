/**
 * Represents the screen that players see when they first launch the game
 */

 var StartScreen = function() {
     this.screenContainer = new PIXI.Container();

     this.titleTextStyle = new PIXI.TextStyle({
        fontFamily: 'Freckle Face',
        fontSize: 48,
        //fontStyle: 'cursive',
        fill: '#660055',
        dropShadow: true,
        dropShadowColor: '#ffffff',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 2,
        wordWrap: true,
        wordWrapWidth: 440,
        align:'center'
    });

    this.startTextStyle = new PIXI.TextStyle({
        fontFamily: 'Freckle Face',
        fontSize: 24,
        //fontStyle: 'cursive',
        fill: '#112200',
        dropShadow: true,
        dropShadowColor: '#ffffff',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 2,
        wordWrap: true,
        wordWrapWidth: 440,
        align:'left'
    });

    this.createScreenObjects();
 }

 StartScreen.prototype = {
     createScreenObjects: function(){
         //BG Image
        assMan.AddTexture({Name: "StartScreenBackground", FileName: "icon.jpg"});
        var bgImage = assMan.GetSprite("StartScreenBackground");
        bgImage.width = gEngine.renderer.width;
        bgImage.height = gEngine.renderer.height;
        this.screenContainer.addChild(bgImage);

        //Title text
        var titleText = new PIXI.Text("Party Animals", this.titleTextStyle);
        this.screenContainer.addChild(titleText);
        titleText.x = (gEngine.renderer.width / 2) - titleText.width;
        titleText.y = 250;

        //Instruction text
        var startText = new PIXI.Text("Start Game", this.startTextStyle);
        this.screenContainer.addChild(startText);
        startText.x = (gEngine.renderer.width / 2) - startText.width;
        startText.y = 500;

        assMan.AddTexture({Name: "UIIndicator", FileName: "checkmark.png"});
        this.selectionArrow = assMan.GetSprite("UIIndicator");
        this.selectionArrow.width = 50;
        this.selectionArrow.heght = 50;
        this.selectionArrow.x = startText.x - this.selectionArrow.width - 15;
        this.selectionArrow.y = startText.y;

        gEngine.stage.addChild(this.screenContainer);
     },

     update: function(dT){
        var gamepads = gEngine.gamepadManager.gamepads;
        for(var i = 0; i < gamepads.length; i++){
            if(gEngine.gamepadManager.getButtonPressed(i, gEngine.gamepadManager.defaultGamepadMapping.buttons.A)){
                this.startGame();
                return;
            }
        }
        // CURRENT DEBUG FOR KEYBOARD USERS
        if (keyMap[32]) {
            this.startGame();
        }
     },

     startGame: function(){
         gEngine.minigameManager.testGameType();
     },
 }