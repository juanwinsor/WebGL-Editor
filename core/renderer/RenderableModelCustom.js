function RenderableModelCustom()
{
    this.shader = null;
    this.transform = new Array();
    this.texture = null;
    this.color = [1, 1, 1];
    this.vertexBuffer = gl.createBuffer();
    this.indexBuffer = gl.createBuffer();
    this.vertices = new Array();
    this.indices = new Array();
    this.indexCount = 0;
    
    mat4.identity(this.transform);
    
}

RenderableModelCustom.prototype.draw = function()
{
    //create vertex buffer, bind it and set the vertex data
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
    //create index buffer, bind it and set the index data	    
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);
    
    gl.vertexAttribPointer(this.shader.positionHandle, 3, gl.FLOAT, gl.FALSE, 36, 0);
    gl.vertexAttribPointer(this.shader.colorHandle, 4, gl.FLOAT, gl.FALSE, 36, 12);
    gl.vertexAttribPointer(this.shader.uvCoordinateHandle, 2, gl.FLOAT, gl.FALSE, 36, 28);

    //update uniforms
    //this.shader.setUniform("u_Col", this.color, UniformType.type_Vector3);
    this.shader.setUniform("u_WorldViewProjection", Renderer.camera.worldViewProjection(this.transform), UniformType.type_Matrix);
    this.shader.setUniform("u_World", this.transform, UniformType.type_Matrix);
    //this.texture.textureSlot = 0;
    //this.shader.setUniform("u_Texture", this.texture, UniformType.type_Texture)
    
    //apply the shader
    this.shader.apply();
    
    //vertex position
    gl.enableVertexAttribArray(this.shader.positionHandle);
    //vertex color
    gl.enableVertexAttribArray(this.shader.colorHandle);
    //uv coords
    gl.enableVertexAttribArray(this.shader.uvCoordinateHandle);
    
    gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 0);
    //gl.drawElements(gl.LINE_LOOP, this.indices.length, gl.UNSIGNED_SHORT, 0);
    
    gl.disableVertexAttribArray(this.shader.positionHandle);
    gl.disableVertexAttribArray(this.shader.colorHandle);
    gl.disableVertexAttribArray(this.shader.uvCoordinateHandle);
}