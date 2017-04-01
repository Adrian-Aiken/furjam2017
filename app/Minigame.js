/**
 * Contains the type definitions required for the Minigame type
 */

var Minigame = function (manifest) {
    if (!manifest) throw ("** MAINIFEST IS REQUIRED **");

    if (!manifest.Name) throw ("** GAME NAME IS REQUIRED **");
    this.name = manifest.Name;
    if (!manifest.Prompt) throw ("** PROMPT IS REQUIRED **");
    this.prompt = manifest.Prompt;
    if (!manifest.Assets) throw ("** ASSETS LIST IS REQUIRED **");
    this.Assets = manifest.Assets;
    if (!manifest.OnLoad) throw ("** ASSETS LOADING FUNCTION IS REQUIRED **");
    this.loadAssets = manifest.OnLoad;

    if (!manifest.Initialize) throw ("** GAME INIT FUNCTION IS REQUIRED **");
    this.init = manifest.Initialize;
    if (!manifest.Update) throw ("** UPDATE FUNCTION IS REQUIRED **");
    this.update = manifest.Update;
    if (!manifest.Finish) throw ("** FINISH FUNCTION IS REQUIRED **");
    this.finish = manifest.Finish;
    if (!manifest.NumPlayers) throw ("** NUM PLAYERS IS REQUIRED **");
    this.numPlayers = manifest.NumPlayers;
};