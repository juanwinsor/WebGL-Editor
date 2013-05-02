var LightingMode = {
    NONE: 0,
    NORMAL: 1
}

var LightType = {
    NONE : 0,
    DIRECTIONAL : 1,
    POINT : 2,
    SPOT : 3,
}

function Light(){
    this.name = "";
    this.type = LightType.NONE;
    this.position = [0, 0, 0];
    this.direction = [0, 0, 0];
    this.enabled = false;
    this.ambientColor = [1, 1, 1, 1];
    this.diffuseColor = [1, 1, 1, 1];
    this.specularColor = [1, 1, 1, 1];
    this.attenuation = [0, 0, 0];
}


var LightManager = new function()
{
    var MAXLIGHTS = 8;
    
    this.shader = new Shader(gl, "../../renderer/lighting.vs", "../../renderer/lighting.fs");
    this.material = null;
    this.lights = new Array();
    
    for (var i = 0; i < MAXLIGHTS; i++) {
        this.lights[i] = null;
    }
    
    
    
    
    
    this.addLight = function(lightType)
    {
        var light = new Light();
        light.type = lightType;
        
        switch (lightType) {
            case LightType.DIRECTIONAL:
                light.position = [0, 0, 0];
                light.direction = [0.6, -0.5, -0.3];
                light.diffuseColor = [1, 0, 0, 1]
                light.specularColor = [1, 1, 1, 1];
                light.enabled = true;
                break;
            case LightType.POINT:
                light.position = [0, 15, 0];
                light.diffuseColor = [1, 1, 1, 1]
                light.specularColor = [1, 1, 1, 1];
                light.ambientColor = [0.2, 0.2, 0.2, 1]
                light.attenuation = [0.001, 0.01, 0.2];
                light.enabled = true;
                break;
            case LightType.SPOT:
                light.position = [10, 8, 10];
                light.direction = [0.4, 0.9, 0.6];
                light.diffuseColor = [1, 1, 1, 1];
                light.specularColor = [1, 1, 1, 1];
                light.ambientColor = [0.2, 0.2, 0.2, 1];
                light.attenuation = [15, 12, 3];
                light.enabled = true;
                break;
        }
        
        for (var i = 0; i < MAXLIGHTS;  i++) {
            if (this.lights[i] == null) {
                this.lights[i] = light;
            }
        }
        
        return light;
        
    }
    
    //sync up the shader data with the local light data
    this.updateLights = function(){
        for (var i = 0; i < MAXLIGHTS;  i++) {
            if (this.lights[i] != null) {
                var uniformNameEnabled = "u_Light[" + i + "].enabled";
                this.shader.setUniform(uniformName, this.lights[i].enabled, UniformType.type_Integer);
                
                var uniformNameType = "u_Light[" + i + "].type";
                this.shader.setUniform(uniformName, this.lights[i].type, UniformType.type_Integer);
                
                var uniformNamePosition = "u_Light[" + i + "].position";
                this.shader.setUniform(uniformName, this.lights[i].position, UniformType.type_Vector3);
                
                var uniformNameDirection = "u_Light[" + i + "].direction";
                this.shader.setUniform(uniformName, this.lights[i].direction, UniformType.type_Vector3);
                
                var uniformNameDiffuse = "u_Light[" + i + "].diffuseColor";
                this.shader.setUniform(uniformName, this.lights[i].diffuseColor, UniformType.type_Vector4);
                
                var uniformNameAmbient = "u_Light[" + i + "].ambientColor";
                this.shader.setUniform(uniformName, this.lights[i].ambientColor, UniformType.type_Vector4);
                
                var uniformNameSpecular = "u_Light[" + i + "].specularColor";
                this.shader.setUniform(uniformName, this.lights[i].specularColor, UniformType.type_Vector4);
                
                var uniformNameAttenuation= "u_Light[" + i + "].attenuation";
                this.shader.setUniform(uniformName, this.lights[i].attenuation, UniformType.type_Vector3);
            }
            else
            {
                var lightEnabled = "u_Light[" + i + "].enabled";
                this.shader.setUniform(lightEnabled, 0, UniformType.type_Integer);
            }
        }
    }
    
    
    this.setMaterial = function(material){
        this.material = material;
        updateMaterial();
    }
    
    this.updateMaterial = function(){
        if (this.material != null && this.material.shader != null) {
            shader.setUniform();
        }
    }
}