/** 
 * Handles and contains the definitions for the game pad information, abstracted
 */

const baseImageFolder = "../assets/SpriteSheets/";

var AssetManager = function() {
    this.Textures = {};
}

AssetManager.prototype = {
    AddTexture: function (asset) {
        this.Textures[asset.Name] = baseImageFolder + asset.FileName;
        PIXI.loader.add(asset.Name, baseImageFolder + asset.FileName);
    },

    LoadAssets: function () {
        PIXI.loader.load((loader, resources) => {
            this.assets = resources;
        });
    },

    GetSprite: function (assetName) {
        return new PIXI.Sprite.fromImage(this.Textures[assetName]);
    }
}