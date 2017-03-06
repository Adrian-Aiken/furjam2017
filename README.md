# FurJam 2017 (Working Title)
Game jam project for a warioware-style game, intended to be played in groups.

[Design doc avaliable here](https://docs.google.com/document/d/1ewmq7GdoQ8Ea04ZrxCxn6__6EbJC-srv6jw_QeV6Xhg/)


## Add a minigame

Each minigame should be self-contained within one .js file. To add your game:

1. Add your game javascript to the app/Minigames folder
2. Within app.js, add your game where it has "GAME LIST", with the format <GameName>: "Minigames/<GameFileName>"
3. Within main.js, add <GameName> to the end of GAME_LIST near the top of the file


## Writing a minigame - TODO
Make sure that your minigame has the following fields and implements the below functions:

### Fields
* Name

### Functions
* Initialize
* Update
* Finish