/*
     Class: Game
     the entry point to the game
*/
/*
     Constructor: Game
     initializes game object
*/
function Game()
{
    this.ship = new spaceShip();
}

/*
    Function: initialize
    
    the first function that runs at the start of the program.  Initialize your game here.
*/
Game.prototype.initialize = function()
{
    this.torchTexture = new Texture2D("torch.png");
    this.torchTexture.sourceRectangle = [0, 0, 128, 128]; //x,y,width,height
    this.torchTexture.destinationRectangle = [400, 400, 128, 128]; //x,y,width,height
    this.torchTexture.color = [1, 1, 1, 1]; //rgba
    this.torchTexture.origin = [64, 64]; //x,y
    this.torchTexture.rotation = 0;   
    
    
    this.groundTexture = new Texture2D("ground.png");
    this.groundTexture.sourceRectangle = [0, 0, 128, 128]; //x,y,width,height
    this.groundTexture.destinationRectangle = [100, 100, 64, 64]; //x,y,width,height
    this.groundTexture.color = [1, 1, 1, 1]; //rgba
    this.groundTexture.origin = [0, 0]; //x,y
    this.groundTexture.rotation = 0;
}

/*
    Function: update
    
    update your game here.
*/
Game.prototype.update = function(gameTime)
{
    this.torchTexture.rotation += 1 * gameTime.elapsedTime;
    this.groundTexture.rotation += 1 * gameTime.elapsedTime;
    
    //this.ship.update();
}

/*
    Function: draw
    
    draw your game here.
*/
Game.prototype.draw = function()
{
    
    
    Renderer2D.drawTexture(this.groundTexture, this.groundTexture.sourceRectangle, this.groundTexture.destinationRectangle, this.groundTexture.color, this.groundTexture.origin, this.groundTexture.rotation);

    Renderer2D.drawTexture(this.torchTexture, this.torchTexture.sourceRectangle, this.torchTexture.destinationRectangle, this.torchTexture.color, this.torchTexture.origin, this.torchTexture.rotation);
    this.ship.draw();
}