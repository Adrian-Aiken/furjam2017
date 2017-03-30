/** 
 * Handles and contains the definitions for the game pad information, abstracted
 */

//NOTE - FOR MOMENT, HARDCODED TO USE KEYBOARD
//TODO - Add reconfigurability, gamepad support, setkey?
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

var GamepadMapping = function(_buttons, _axes) {
    if(!_buttons)
    {
        this.buttons = this.DefaultGamepadButtons;
    }
    else{
        this.buttons = _keys;
    }
    
    if(!_axes){
        this.axes = this.DefaultGamepadAxes;
    }
    else{
        this.axes = _axes;
    }
}

/** 
 * Constructor for Gamepad object
 *  GamepadNumber and GamepadManager only needed if isKeyboard is false
 */
var PlayerGamepad = function(_isKeyboard, _defaultConfig, _gamepadNumber, _gamepadManager) {
    this.isKeyboard = _isKeyboard;
    this.config = _defaultConfig;
    this.gamepadNum = _gamepadNumber;
    this.gamepadManager = _gamepadManager;
}

PlayerGamepad.prototype = {
    left:   function () { return this.getButton(0); },
    up:     function () { return this.getButton(1); },
    right:  function () { return this.getButton(2); },
    down:   function () { return this.getButton(3); },
    a_btn:  function () { return this.getButton(4); },
    b_btn:  function () { return this.getButton(5); },

    getButton: function (buttonNum) {
        if (this.isKeyboard) {
            return keyMap[this.config[buttonNum]]; 
        } else {
            return this.gamepadManager.getButtonPressed(this.gamepadNum, this.config[buttonNum])
        }
    }
} 

GamepadMapping.prototype = {

    DefaultGamepadButtons:{
        A: 0,
        B: 1,
        X: 2,
        Y: 3,
        L1: 4,
        R1: 5,
        L2: 6,
        R2: 7,
        Select: 8,
        Start: 9,
        L3: 10,
        R3: 11,
        DpadUp: 12,
        DpadDown: 13,
        DpadLeft: 14,
        DpadRight: 15,
        Center: 16
    },

    DefaultGamepadAxes:{
        LeftStickHorizontal: 0,
        LeftStickVertical: 1,
        RightStickHorizontal: 2,
        RightStickVertical: 3
    },

    remapButton: function(buttonId, newButtonIndex){
        if(this.buttons[buttonId]){
            this.buttons[buttonId] = newButtonIndex;
        }
    },

    remapAxis: function(axisId, newAxisIndex){
        if(this.axes[axisId]){
            this.axes[axisId] = newAxisIndex;
        }
    }
}

var GamepadManager = function(){
    window.addEventListener("gamepadconnected", this.gamepadConnected.bind(this), false);
    window.addEventListener("gamepaddisconnected", this.gamepadDisconnected.bind(this), false);

    this.defaultGamepadMapping = new GamepadMapping();

    this.pollConnectedGamepads();
}

GamepadManager.prototype = {

    gamepads: {},

    pollConnectedGamepads: function () {
        this.gamepads = navigator.getGamepads();
    },

    gamepadConnected: function (event) {
        var gamepad = event.gamepad;

        this.gamepads[gamepad.index] = gamepad;
        console.log("Gamepad added!" + gamepad.id + ": " + gamepad.index);
    },

    gamepadDisconnected: function (event) {
        console.log("Gamepad removed!" + gamepad.id + ": " + gamepad.index);
        delete this.gamepads[gamepad.index];
    },

    getButtonPressed: function (gamepadIndex, buttonIndex) {
        var retVal = false;

        if (this.gamepads[gamepadIndex]) {
            if (buttonIndex > -1) {
                var button = this.gamepads[gamepadIndex].buttons[buttonIndex];
                retVal = button.pressed || button.value > 0;
            }
        }

        return retVal;
    },

    getButtonValue: function (gamepadIndex, buttonIndex) {
        var retVal = 0;

        if (this.gamepads[gamepadIndex]) {
            if (buttonIndex > -1) {
                var button = this.gamepads[gamepadIndex].buttons[buttonIndex];
                retVal = button.value;
            }
        }

        return retVal;
    },

    getAxisValue: function (gamepadIndex, axisIndex) {
        var retVal = 0.0;

        if (this.gamepads[gamepadIndex]) {
            if (axisIndex > -1) {
                var axis = this.gamepads[gamepadIndex].axes[axisIndex];
                retVal = axis;
            }
        }

        return retVal;
    },

    
}