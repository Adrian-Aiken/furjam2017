/**
* Represents an individual player participating in the game
*/

/**
* Constructor for a player, called on the game start screen as players join the game
* @param _name - this player's name (entered on game start)
* @param _color - the color that this player has chosen (entered on game start)
* @param _avatar - that avatar that this player has chosen
*/
var Player = function (_name, _color, _avatar) {
    this.points = 0;
    this.name = _name;
    this.color = _color;
    this.avatar = _avatar;
}

Player.prototype = {

    //Used to associate this player with a given gamepad
    setGamepadIndex: function (newIndex) {
        if (this.myGamepad) {
            this.myGamepad.gamepadNum = newIndex;
        }
        else {
            this.myGamepad = new PlayerGamepad(false, new GamepadMapping(), newIndex, gEngine.gamepadManager);
        }
    }
}