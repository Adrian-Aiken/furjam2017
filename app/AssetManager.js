/** 
 * Handles and contains the definitions for the game pad information, abstracted
 */

const baseImageFolder = "../assets/SpriteSheets/";

var AssetManager = function() {
    this.Textures = {};
}

AssetManager.prototype = {
    AddTexture: function (asset) {
        if (this.Textures[asset.Name]) return;

        this.Textures[asset.Name] = baseImageFolder + asset.FileName;
        PIXI.loader.add(asset.Name, baseImageFolder + asset.FileName);
    },

    GetSprite: function (assetName) {
        return new PIXI.Sprite.fromImage(this.Textures[assetName]);
    }
}