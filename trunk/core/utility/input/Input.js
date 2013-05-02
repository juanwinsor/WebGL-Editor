/*
     Class: Input
     get input states
*/
var Input = new function()
{
    var keys = new Object();
    
    this.handleKeyDown = function(event)
    {
        keys[event.keyCode] = true;
    }
    
    this.handleKeyUp = function(event)
    {
        keys[event.keyCode] = false;
    }

    
    //register for key events
    document.onkeydown = this.handleKeyDown;
    document.onkeyup = this.handleKeyUp;
    
    /*
    Function: getKey
    
    pass a keycode and get its pressed state
    
    Parameters:
        key - the keycode you would like to check the state of
        
    Returns:
        a boolean representing the key pressed state
    */
    this.getKey = function(key)
    {
        return keys[key];
    }
    
    
}