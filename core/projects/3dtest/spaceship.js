function spaceShip()
{
    this.verticesBody = new Array();
    this.indicesBody = new Array();
    
    //ship body
    this.verticesBody = [0, 0.5, -12,   0.7, 0.7, 0.7, 1,   1, 1,
                        -2, 0, 0,       0.7, 0.7, 0.7, 1,   1, 1,
                        0, 1, -3,       0.7, 0.7, 0.7, 1,   1, 1,
                        2, 0, 0,        0.7, 0.7, 0.7, 1,   1, 1,
                        0, -1, -1,      0.7, 0.7, 0.7, 1,   1, 1
    ];
    
    this.indicesBody[0] = 0;
    this.indicesBody[1] = 1;
	this.indicesBody[2] = 2;
	this.indicesBody[3] = 2;
	this.indicesBody[4] = 3;
	this.indicesBody[5] = 0;
	this.indicesBody[6] = 4;
	this.indicesBody[7] = 1;
	this.indicesBody[8] = 0;
	this.indicesBody[9] = 4;
	this.indicesBody[10] = 0;
	this.indicesBody[11] = 3;
	this.indicesBody[12] = 1;
	this.indicesBody[13] = 4;
	this.indicesBody[14] = 3;
    
    
    this.m_Vertices = [
    	    
		    //top left
		    0, 0, 0,          1, 1, 1, 1,     0, 1,
		    //bottom left
		    0, -1, 0,        1, 1, 1, 1,     0, 0,
		    //bottom right
		    1, -1, 0,    1, 1, 1, 1,     1, 0,
		    //top right
		    1, 0, 0,          1, 1, 1, 1,     1, 1
	    ];
    
    this.m_Indices = [0, 1, 2, 3, 0, 2];
    
    this.shipBody = new RenderableModelCustom();
    this.shipBody.shader = new Shader(gl, "shaders/ship.vs", "shaders/ship.fs");
    
    this.shipBody.texture = new Texture2D("ground.png");
    
    this.shipBody.vertices = this.verticesBody;
    this.shipBody.indices = this.indicesBody;
    //this.shipBody.vertices = this.m_Vertices;
    //this.shipBody.indices = this.m_Indices;
    mat4.translate(this.shipBody.transform, [0, 0, -20]);
    mat4.rotateY(this.shipBody.transform, (45 * (Math.PI / 180)), this.shipBody.transform);
    //Renderer.addRenderable(this.shipBody);
    
}

spaceShip.prototype.draw = function()
{
    this.shipBody.draw();
}

spaceShip.prototype.update = function()
{
    mat4.translate(this.shipBody.transform, [0, 0, -1], this.shipBody.transform);    
}