var Renderer = new function()
{
    this.camera = null;
    this.screenWidth = 640;
    this.screenHeight = 480;
    
    this.renderableList = new Array();
    
    this.gameTime = null;
    
    
    
    this.initialize = function()
    {
        
        this.camera = new Camera(this.screenWidth, this.screenHeight);
    }
    
    this.clear = function()
    {
        gl.clearDepth(1);
        gl.clearColor(0.39, 0.584, 0.9294, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }
    
    this.begin = function()
    {
        this.clear();
        
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LESS);
        gl.depthMask(gl.TRUE);
        gl.depthRange(0, 1);
    }
    
    this.end = function()
    {
        gl.disable(gl.DEPTH_TEST);
    }
    
    this.draw = function(gameTime)
    {
        this.gameTime = gameTime;
        
        for (var i = 0; i < this.renderableList.length; i++){
            //every renderable object needs to implement draw
            this.renderableList[i].draw();
        }
    }
    
    
    this.addRenderable = function(renderable)
    {
        if (renderable!= null) {
            this.renderableList.push(renderable);
        }        
    }
    
    this.deleteRenderable = function(renderable)
    {
        for (var i = 0; i < this.renderableList.length; i++) {
            if (this.renderableList[i] == renderable) {
                //delete the renderable from the array
                this.renderableList.splice(i, 1);
            }
        }
    }
    
    
}