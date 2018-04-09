# FurJam 2017 (Working Title)
Game jam project for a warioware-style game, intended to be played in groups.


## Add a minigame

Each minigame should be self-contained within one .js file. To add your game:

1. Add your game javascript to the app/Minigames folder
2. Within app.js, add your game where it has "GAME LIST", with the format <GameName>: "Minigames/<GameFileName>"
3. Within main.js, add <GameName> to the end of GAME_LIST near the top of the file


## Writing a minigame - TODO
Make sure that your minigame has the following fields and implements the below functions:

### Fields
* Name
* Prompt - given to the player of what to do. Should be short and easy to understand.
* Assets - List of external assets used

### Functions
* Initialize
* Update
* Finish