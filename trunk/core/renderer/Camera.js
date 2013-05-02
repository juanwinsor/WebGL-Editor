function Camera(screenWidth, screenHeight){
    this.view = new Array();
    this.projection = new Array();
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    this.fieldOfView = 60;
    this.position = [0, 0, 0];
    
    var ratio = screenWidth / screenHeight;
    
    mat4.identity(this.projection);
    //set a persepective projection matrix
    mat4.perspective(this.fieldOfView, ratio, 0.1, 1000, this.projection);
    
    mat4.identity(this.view);
    mat4.lookAt(this.position, [0, 0, 0], [0, 1, 0], this.view);
    //mat4.translate(this.view, [0, 0, 10], this.view);
    
    gl.viewport(0, 0, screenWidth, screenHeight);
}

Camera.prototype.worldViewProjection = function(worldTransform){
    var result = new Array();
    mat4.multiply(this.view, this.projection, result);
    mat4.multiply(result, worldTransform, result);

    return result;
}