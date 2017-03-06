/**
 * Contains the type definitions required for the Minigame type
 */

var Minigame = function(manifest) {
    if (!manifest) throw("** MAINIFEST IS REQUIRED **");
    if (!manifest.Name) throw("** GAME NAME IS REQUIRED **");
};