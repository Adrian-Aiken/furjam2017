/** 
 * Handles and contains the definitions for the game pad information, abstracted
 */

//NOTE - FOR MOMENT, HARDCODED TO USE KEYBOARD
//Left, up, right, down, a, b
var Player1_keys = [65, 87, 68, 83, 32, 16];
var Player2_keys = [37, 38, 39, 40, 17, 96];
var keyMap = {};

onkeydown = function(e) {
    keyMap[e.keyCode] = true;
}
onkeyup = function(e) {
    keyMap[e.keyCode] = false;
}

var Gamepad = function(keys) {
    this._keys = keys;
}

Gamepad.prototype = {
    left:   function () { return keyMap[this._keys[0]]; },
    up:     function () { return keyMap[this._keys[1]]; },
    right:  function () { return keyMap[this._keys[2]]; },
    down:   function () { return keyMap[this._keys[3]]; },
    a_btn:  function () { return keyMap[this._keys[4]]; },
    b_btn:  function () { return keyMap[this._keys[5]]; }
}