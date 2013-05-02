function Level()
{
    
}

Level.prototype.initialize = function()
{
    this.torch = new Texture2D("images/torch.png");
    this.ground = new Texture2D("images/ground.png");
    this.ground2 = new Texture2D("images/ground2.png");
    this.brickwall = new Texture2D("images/brickwall.png");
    this.crate = new Texture2D("images/crate.png");
}

Level.prototype.draw = function()
{
    for(var i = 0; i < 10 ; i++)
    {
        for(var j = 0; j < 7; j++)
        {
            //draw the brick wall
            Renderer2D.drawTexture(this.brickwall, [0, 0, 128, 128], [i * 64, j * 64 + 100, 64, 64], [1, 1, 1, 1], [0, 0], 0);
        }
        
        //draw the ground tiles
        Renderer2D.drawTexture(this.ground, [0, 0, 128, 128], [i * 64, 100, 64, 64], [1, 1, 1, 1], [0, 0], 0);
        Renderer2D.drawTexture(this.ground2, [0, 0, 128, 128], [i * 64, 36, 64, 64], [1, 1, 1, 1], [0, 0], 0);

    }
    
    Renderer2D.drawTexture(this.torch, [0, 0, 128, 128], [128, 300, 64, 64], [1, 1, 1, 1], [0, 0], 0);
    
    Renderer2D.drawTexture(this.torch, [0, 0, 128, 128], [512, 300, 64, 64], [1, 1, 1, 1], [0, 0], 0);
    
    Renderer2D.drawTexture(this.crate, [0, 0,128, 128], [250, 164, 64, 64], [1, 1, 1, 1], [0, 0], 0);
}