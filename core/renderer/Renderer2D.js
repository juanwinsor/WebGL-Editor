/*
     Class: Renderer2D
     A renderer used to draw 2D objects to the screen.
     This object is a globally available singleton
*/
/*
     Constructor: Renderer2D
     never construct this object, it is a globally available singleton
*/
var Renderer2D = new function()
{
    this.screenWidth = 640;
    this.screenHeight = 480;
    
    this.m_Vertices = new Array();
    this.m_Indices = new Array();
    
    this.m_Projection = new Array();
    this.m_World = new Array();

    var m_BatchList = new Array();
    
    /*
	Function: initialize
	
	internal initialization of webgl, do not use.
	
	Parameters:
	
	   canvas - the canvas object to draw on
    */
    this.initialize = function(canvas)
    {
        //enable alpha blending
	gl.enable(gl.BLEND);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        
        this.setScreenSize(canvas, this.screenWidth, this.screenHeight);
        
        this.spriteShader = new Shader(gl, "../../renderer/renderer2D.vs", "../../renderer/renderer2D.fs");
	
	//create the index and vertex buffers
	this.vertexBuffer = gl.createBuffer();
	this.indexBuffer = gl.createBuffer();
	
    };
    
    /*
	Function: setScreenSize
	
	sets the canvas object screen size
	
	Parameters:
	
	   canvas - the canvas object to change
	   width - new width
	   height - new height
    */
    this.setScreenSize = function(canvas, width, height)
    {
        canvas.width = width;
        canvas.height = height;
    };
    
    
    
    this.clear = function()
    {
        
    }
    
    /*
	Function: begin
	
	call this before any 2d draw calls
    */
    this.begin = function()
    {
        
    };
    
    var previousTextureDrawn = new Object();
    previousTextureDrawn.texture = new Object();
    
    /*
	Function: end
	
	call this after all 2D draw calls
    */
    this.end = function()
    {
        //if(m_BatchList.length > 0)
	//{
	    previousTextureDrawn.texture = new Object();
	    previousTextureDrawn.texture.fileName = "";	    
	//}
	
	//sort everything and draw
	m_BatchList.sort();
	
	//draw everything
	for(var i = 0; i < m_BatchList.length; i++)
	{
	    var width = m_BatchList[i].destRectangle[2];
	    var height = m_BatchList[i].destRectangle[3];
	    
	    //calculate texture coordinates
	    var uleft = m_BatchList[i].srcRectangle[0] / m_BatchList[i].texture.width;
	    var uright = m_BatchList[i].srcRectangle[2] / m_BatchList[i].texture.width;
	    var vtop = m_BatchList[i].srcRectangle[3] / m_BatchList[i].texture.height;
	    var vbottom = m_BatchList[i].srcRectangle[1] / m_BatchList[i].texture.height;
	    
	    //define quad vertices
	    //this.m_Vertices = [
	    //        
	    //        //top left
	    //        0 - origin[0], 0 + origin[1], 0,              1, 1, 1, 1,     uleft, vtop,
	    //        //bottom left
	    //        0 - origin[0], -height + origin[1], 0,        1, 1, 1, 1,     uleft, vbottom,
	    //        //bottom right
	    //        width - origin[0], -height + origin[1], 0,    1, 1, 1, 1,     uright, vbottom,
	    //        //top right
	    //        width - origin[0], 0 + origin[1], 0,          1, 1, 1, 1,     uright, vtop
	    //];
	    
	    //
	    this.m_Vertices = [
		    
		    //top left
		    (0 - m_BatchList[i].origin[0]), (0 + m_BatchList[i].origin[1]), 0,              m_BatchList[i].color[0], m_BatchList[i].color[1], m_BatchList[i].color[2], m_BatchList[i].color[3],     uleft, vtop,
		    //bottom left
		    (0 - m_BatchList[i].origin[0]), (-height + m_BatchList[i].origin[1]), 0,        m_BatchList[i].color[0], m_BatchList[i].color[1], m_BatchList[i].color[2], m_BatchList[i].color[3],     uleft, vbottom,
		    //bottom right
		    (width - m_BatchList[i].origin[0]), (-height + m_BatchList[i].origin[1]), 0,    m_BatchList[i].color[0], m_BatchList[i].color[1], m_BatchList[i].color[2], m_BatchList[i].color[3],     uright, vbottom,
		    //top right
		    (width - m_BatchList[i].origin[0]), (0 + m_BatchList[i].origin[1]), 0,          m_BatchList[i].color[0], m_BatchList[i].color[1], m_BatchList[i].color[2], m_BatchList[i].color[3],     uright, vtop
	    ];
	    //this.m_Vertices = [
	    //        
	    //        //top left
	    //        (0 - origin[0]), (0 + origin[1]), 0,		color[0], color[1], color[2], color[3],
	    //        //bottom left
	    //        (0 - origin[0]), (-height + origin[1]), 0,	color[0], color[1], color[2], color[3],
	    //        //bottom right
	    //        (width - origin[0]), (-height + origin[1]), 0,	color[0], color[1], color[2], color[3],
	    //        //top right
	    //        (width - origin[0]), (0 + origin[1]), 0,	color[0], color[1], color[2], color[3]
	    //];
     
     
     
	    //define quad indices
	    this.m_Indices = [0, 1, 2, 3, 0, 2];
	    
	    
	    //projection matrix
	    mat4.identity(this.m_Projection);
	    mat4.ortho(0, this.screenWidth, 0, this.screenHeight, 1, -1, this.m_Projection);
	    
	    
	    //world matrix
	    mat4.identity(this.m_World);	
	    //mat4.translate(this.m_World, [100, 100, 0]);
	    mat4.translate(this.m_World, [m_BatchList[i].destRectangle[0], m_BatchList[i].destRectangle[1], 0]);
	    mat4.rotate(this.m_World, -m_BatchList[i].rotation, [0, 0, 1]);
	    
	    
	    //create vertex buffer, bind it and set the vertex data
	    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
	    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.m_Vertices), gl.STATIC_DRAW);
	    //create index buffer, bind it and set the index data	    
	    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
	    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.m_Indices), gl.STATIC_DRAW);
	    
	    //set uniforms that always change
	    this.spriteShader.setUniform("u_WorldMatrix", this.m_World, UniformType.type_Matrix);
	    this.spriteShader.setUniform("u_ProjectionMatrix", this.m_Projection, UniformType.type_Matrix);
	    
	    //if the image has changed we move set the new texture and reaplly the shader
	    if(previousTextureDrawn.texture.fileName != m_BatchList[i].texture.fileName)
	    {
		//set the texture
		m_BatchList[i].texture.texture.TextureSlot = 0;
		this.spriteShader.setUniform("u_Texture", m_BatchList[i].texture.texture, UniformType.type_Texture);
		
		//vertex position
		gl.vertexAttribPointer(this.spriteShader.positionHandle, 3, gl.FLOAT, gl.FALSE, 36, 0);

		//vertex color
		gl.vertexAttribPointer(this.spriteShader.colorHandle, 4, gl.FLOAT, gl.FALSE, 36, 12);

		//uv coords
		gl.vertexAttribPointer(this.spriteShader.uvCoordinateHandle, 2, gl.FLOAT, gl.FALSE, 36, 28);		
	    }
	    
	    //load the sprite shader onto the gpu
	    this.spriteShader.apply();

	    gl.enableVertexAttribArray(this.spriteShader.positionHandle);
	    gl.enableVertexAttribArray(this.spriteShader.colorHandle);
	    gl.enableVertexAttribArray(this.spriteShader.uvCoordinateHandle);
	    
	    
	    //draw the elements
	    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
	    //gl.drawElements(gl.TRIANGLES, 2, gl.UNSIGNED_SHORT, 0);
	

	    gl.disableVertexAttribArray(this.spriteShader.positionHandle);
	    gl.disableVertexAttribArray(this.spriteShader.colorHandle);
	    gl.disableVertexAttribArray(this.spriteShader.uvCoordinateHandle);

	    
	    previousTextureDrawn = m_BatchList[i];

	}
	
	//clear the array
	m_BatchList.length = 0;
    };
    
    this.drawString = function()
    {
        
        
    };
    
    /*
	Function: drawTexture
	
	call this in between begin and end calls to draw a Texture2D object to the screen
	
	Parameters:
	    
	    texture - a <Texture2D> object
	    srcRectangle - a 4 element array containing [x position, y position, width, height] from the original texture source
	    destRectangle - a 4 element array containing [x position, y position, width, height] determining where on the screen to draw the image
	    color - a 4 element array containing [red, green, blue, alpha]
	    origin - the pivot point or origin of the image.  the x and y positions for destRectangle start from the origin
	    rotation - a float value determing the rotation of an image
	    
	See Also:
	
	    <Texture2D>
    */
    this.drawTexture = function(texture, srcRectangle, destRectangle, color, origin, rotation)
    {
	//store all of the draw call data in an object to be draw later when all 2D draw calls are complete (when end is called)
	var batchObject = new Object();
	batchObject.texture = texture;
	batchObject.srcRectangle = srcRectangle;
	batchObject.destRectangle = destRectangle;
	batchObject.color = color;
	batchObject.origin = origin;
	batchObject.rotation = rotation;
	
	m_BatchList.push(batchObject);
    };
    
    
    var fps_InitialTime = 0;
    var fps_FrameCount = 0;
    
    /*
	Function: calculateFPS
	
	determines approximate frames per second and outputs to the screen
	
	Parameters:
	
	    gameTime - the gameTime Object passed into the game.js update function
    */
    this.calculateFPS = function(gameTime)
    {	
	var interval = 1.0;

	if((gameTime.totalTime - fps_InitialTime) > interval)
	{
		document.getElementById("fps").innerText = Math.round((fps_FrameCount / (gameTime.totalTime - fps_InitialTime)));
		fps_FrameCount = 0;
		fps_InitialTime = gameTime.totalTime;
	}
	else
	{
		fps_FrameCount++;
	}
    }
    
    
}