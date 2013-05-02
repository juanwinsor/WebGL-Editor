//uniform type enum for the type argument in setUniform
var UniformType = {
    type_Integer : 0,
    type_Float : 1,
    type_Vector2 : 2,
    type_Vector3 : 3,
    type_Vector4 : 4,
    type_Matrix : 5,
    type_Texture : 6
}

/*
     Class: Shader
     an object representing a shader program
*/
/*
     Constructor: Shader
     compiles the shader at the path specified
     Parameters:
     
            glContext - the WebGL context
            shaderPath - the path to the shader source
*/
function Shader(glContext, vertexPath, fragmentPath)
{
    this.uniforms = new Array();
    this.uniforms.count = 0;
    
    
    this.worldViewProjectionHandle = -1;
    this.worldMatrixHandle = -1;
    this.projectionMatrixHandle = -1;
    this.textureHandle = -1;
    
    //attribute handles    
    this.positionHandle = -1;
    this.normalHandle = -1;
    this.colorHandle = -1;
    this.uvCoordinateHandle = -1;
    
    this.vertexShaderSource = "";
    this.vertexShaderLength = 0;
    this.vertexShaderHandle = -1;
    
    this.fragmentShaderSource = "";
    this.fragmentShaderLength = 0;
    this.fragmentShaderHandle = -1;
    
    this.programHandle = -1;
    
    this.loadShader(glContext, vertexPath, fragmentPath);
    
    
    //get attribute handles
    this.colorHandle = gl.getAttribLocation( this.programHandle, "a_Color" );	
    this.positionHandle = gl.getAttribLocation( this.programHandle, "a_Position" );	
    this.uvCoordinateHandle = gl.getAttribLocation( this.programHandle, "a_UVCoordinates" );
    this.normalHandle = gl.getAttribLocation(this.programHandle, "a_Normal");
    
    //get uniform handles
    this.worldViewProjectionHandle = gl.getUniformLocation(this.programHandle, "u_WorldViewProjection");
    this.worldMatrixHandle = gl.getUniformLocation(this.programHandle, "u_WorldMatrix");
    this.projectionMatrixHandle = gl.getUniformLocation(this.programHandle, "u_ProjectionMatrix");
    this.textureHandle = gl.getUniformLocation(this.programHandle, "u_Texture");
}


/*
    Function: apply
    
    loads the shader onto the GPU and apply its values
*/
Shader.prototype.apply = function()
{
    gl.useProgram(this.programHandle);
    
    //loop through all of the uniforms
    for(var i = 0; i < this.uniforms.count; i++)
    {
        //make sure the handle is valid
        if(this.uniforms[i].handle != null)
        {
            //set the uniform value based on its type
            switch(this.uniforms[i].type)
            {
                case UniformType.type_Integer: //integer
                    gl.uniform1i(this.uniforms[i].handle, this.uniforms[i]);
                    break;
                
                case UniformType.type_Float: //float
                    gl.uniform1f(this.uniforms[i].handle, this.uniforms[i]);
                    break;
                
                case UniformType.type_Vector2: //vector2
                    gl.uniform2fv(this.uniforms[i].handle, this.uniforms[i]);
                    break;
                
                case UniformType.type_Vector3:
                    gl.uniform3fv(this.uniforms[i].handle, this.uniforms[i]);
                    break;
                
                case UniformType.type_Matrix:
                    gl.uniformMatrix4fv(this.uniforms[i].handle, false, this.uniforms[i]);
                    break;
                
                case UniformType.type_Texture:
                    ///gl.bindTexture(gl.TEXTURE_2D, null);
                    
                    //determine which slot to activate
                    switch(this.uniforms[i].TextureSlot)
                    {
                        case 0:
                            gl.activeTexture(gl.TEXTURE0);
                            break;
                        
                        case 1:
                            gl.activeTexture(gl.TEXTURE1);
                            break;
                        
                        case 2:
                            gl.activeTexture(gl.TEXTURE2);
                            break;
                        
                        case 3:
                            gl.activeTexture(gl.TEXTURE3);
                            break;
                    }
                    
                    //bind the texture to work on it
                    gl.bindTexture(gl.TEXTURE_2D, this.uniforms[i]);
                    //assign the texture slot to the uniform texture
                    gl.uniform1i(this.uniforms[i].handle, this.uniforms[i].TextureSlot);

                    break;
            }
        }
    }
};

/*
    Function: setUniform
    
    sets a uniform value in the shader
    
    Parameters:
    
        uniformName - the string name of the uniform (ie. WorldViewProj)
        value - the value to set the uniform to
        valueType - determines what kind of data value contains
*/
Shader.prototype.setUniform = function(uniformName, value, valueType)
{
    //store the name with the value
    value.name = uniformName;
    //store the value type with the value
    value.type = valueType;
    
    var found = false;
    
    //check if uniform already exists
    for(var i = 0; i < this.uniforms.count; i++)
    {
        //an instance already exists
        if(this.uniforms[i].name == value.name)
        {
            //save the handle it has to the shader uniform
            value.handle = this.uniforms[i].handle;
            
            //set the found uniforms value and exit
            this.uniforms[i] = value;
            found = true;
            
            break;
        }
    }
    
    //no uniform exists by the name, create a new one
    if(!found)
    {
        //get the handle of the uniform
        value.handle = gl.getUniformLocation(this.programHandle, value.name);
        
        //add the new uniform to the uniforms array
        this.uniforms.count += 1;
        this.uniforms[this.uniforms.count - 1] = value;        
    }
};

Shader.prototype.loadShader = function(gl, vertexShader, fragmentShader) {
    //this uses jquery, don't really like the dependency but is the cleanest way to load the file contents
    var vertexSource;
    var fragmentSource;
    
    //post data to retrieve the vertex shader
    var postDataV = {
        project : projectID,
        path : projectDirectory + "/" + vertexShader,
        op : 3
    }
    //post data to retrieve the fragment shader
    var postDataF = {
        project : projectID,
        path : projectDirectory + "/" + fragmentShader,
        op : 3
    }
    
    $.ajax({
        type : "POST",
        async : false,
        url : "../utility/fileIO.php",
        data : postDataV,
        success : function(fileData) {
            vertexSource = fileData;
        }        
    });
    
    $.ajax({
        type : "POST",
        async : false,
        url : "../utility/fileIO.php",
        data : postDataF,
        success : function(fileData) {
            fragmentSource = fileData;
        }
    });
    
    var vs = gl.createShader(gl.VERTEX_SHADER);
    var fs = gl.createShader(gl.FRAGMENT_SHADER);
    
    //compile the vertex and fragment shaders
    
    var vsCompiled = false;
    var fsCompiled = false;
    
    //compile vertex shader and check the result
    gl.shaderSource(vs, vertexSource);
    gl.compileShader(vs);
    var vsResult = gl.getShaderParameter(vs, gl.COMPILE_STATUS);
    if(vsResult)
    {
        vsCompiled = true;
    }
    else
    {
        var vsCompileError = gl.getShaderInfoLog(vs);
        alert(vertexShader + " : Vertex Shader failed to compile: " + vsCompileError);
    }
    
    //compile the fragment shader and check the result
    gl.shaderSource(fs, fragmentSource);
    gl.compileShader(fs);
    var fsResult = gl.getShaderParameter(fs, gl.COMPILE_STATUS);
    if(fsResult)
    {
        fsCompiled = true;
    }
    else
    {
        var fsCompileError = gl.getShaderInfoLog(fs);
        alert(fragmentShader + " : Fragment Shader failed to compile: " + fsCompileError);
    }
    
    //attach and link shaders
    this.programHandle = gl.createProgram();
    gl.attachShader(this.programHandle, vs);
    gl.attachShader(this.programHandle, fs);
    
    gl.linkProgram(this.programHandle);
    
    if (!gl.getProgramParameter(this.programHandle, gl.LINK_STATUS)) {
      alert(fragmentShader + " : shader linking failed.");
    }
    
}