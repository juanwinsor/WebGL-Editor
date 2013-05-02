/*
     Class: Texture2D
     a texture object that holds the dimensions and texture data of an image.
*/
/*
     Constructor: Texture2D
     initializes the object with the image specified
     Parameters:
          filePath - the path to the image to load
*/
function Texture2D(filePath)
{

     
    //load a texture
    
    //create a texture handle
     this.texture = gl.createTexture();
     //create a new image in js
     this.texture.image = new Image();
     
     
     this.texture.image.glTexture = this.texture;
     this.texture.image.parent = this;
     
     //onload is called when the image src is set and fully loaded
     this.texture.image.onload = function()
     {
          //specify the texture we are working on
          gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
          //flip on the y axis so it isn't upside down
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
          //gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
          //set the data of the webgl texture from the js image
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this);
          //set wrap modes
          //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
          //set mag/min filters
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
          //unbind the texture, we are done with it
          gl.bindTexture(gl.TEXTURE_2D, null);
          
          //set the dimensions
          this.parent.width = this.width;
          this.parent.height = this.height;
     }
     
     //load the image from path, this will trigger the onload when done loading
     this.texture.image.src = projectDirectory + '/' + filePath;
     
     this.fileName = filePath;
     
     //alert(this.width);
   
}