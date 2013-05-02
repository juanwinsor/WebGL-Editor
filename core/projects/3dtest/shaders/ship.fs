precision mediump float;

uniform mat4 u_WorldViewProjection;
uniform sampler2D u_Texture;
uniform vec3 u_Color;
uniform vec3 u_Col;
uniform vec3 u_CameraPosition;

varying vec4 v_Position;
varying vec4 v_Color;
varying vec2 v_UVCoord;
varying vec3 v_Normal;

void main()
{
    //gl_FragColor = texture2D(u_Texture, v_UVCoord) * v_Color; //* vec4(u_Color, 1);
    
    
    vec3 temp = vec3(1, 1, 1);
    temp = temp * distance(vec3(v_Position), vec3(0, 0, 0));
    gl_FragColor = normalize(vec4(temp, 1)) * v_Color;
    
}