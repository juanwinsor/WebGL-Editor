function Game()
{
    
}


Game.prototype.initialize = function()
{
    this.m_Level = new Level();
    this.m_Level.initialize();
    
    this.player = new Texture2D("images/soldier2.png");
    this.player.velocity = [0, 0];
    this.player.position = [50, 250];
    
    this.gravity = -300;
    
    this.groundPosition = 228;
    
    this.stoneWall = new Texture2D("images/brickwall.png");
}


Game.prototype.update = function(gameTime)
{
    //left
    if(Input.getKey(65))
    {
        this.player.velocity[0] = -100.0;
    }
    //right
    else if(Input.getKey(68))
    {
        this.player.velocity[0] = 100.0;
    }
    else
    {
        this.player.velocity[0] = 0;  
    }
    
    if(Input.getKey(32))
    {
        if(this.player.position[1] == this.groundPosition)
        {
            this.player.velocity[1] += 170;
        }        
    }
    
    this.player.position[0] += this.player.velocity[0] * gameTime.elapsedTime;
    //this.player.position[1] += this.player.velocity[1] * gameTime.elapsedTime;
    this.player.velocity[1] += this.gravity * gameTime.elapsedTime;
    this.player.position[1] += this.player.velocity[1] * gameTime.elapsedTime;
    
    
    //player hit the ground
    if(this.player.position[1] < this.groundPosition)
    {
        this.player.position[1] = this.groundPosition;
        this.player.velocity[1] = 0;
    }

    
    //draw fps to the page
    Renderer2D.calculateFPS(gameTime);
}

Game.prototype.draw = function()
{
    this.m_Level.draw();
    
    //Renderer2D.drawTexture(this.stoneWall, [0, 0, 256, 256], [this.player.position[0], this.player.position[1], 64, 64], [1, 1, 1, 1], [0, 0], 0);
    Renderer2D.drawTexture(this.player, [0, 0, 128, 128], [this.player.position[0], this.player.position[1], 128, 128], [1, 1, 1, 1], [0, 0], 0);
}