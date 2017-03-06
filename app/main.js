"use strict";



var stage, renderer, sprites, gameState;

function initPixi()
{
     var type = "WebGL";
     if (!PIXI.utils.isWebGLSupported()) {
         type = "canvas";
     }

     PIXI.utils.sayHello(type);

     renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {antialias: true, transparent: false, resolution: 1, autoResize:true});

     document.body.appendChild(renderer.view);

     stage = new PIXI.Container();

     update();
}

function testSprite()
{
    PIXI.loader
        .add("../assets/icon.jpg")
        .on("progress", loadProgressHandler)
        .load(addSpriteToStage);
}

function assetLoadedCallback(loader, resource)
{
    
}

function addSpriteToStage()
{
    var sprite = new PIXI.Sprite(PIXI.loader.resources["../assets/icon.jpg"].texture);
    stage.addChild(sprite);
}

function testAnimationSpriteSheet()
{
    
}

function render()
{
    renderer.render(stage);
}

function update()
{
    requestAnimationFrame(update);

    if(gameState != null)
    {
        gameState();
    }

    //todo: web worker for render thread
    render();
}

function solitareState()
{
    
}

initPixi();
gameState = solitareState;




