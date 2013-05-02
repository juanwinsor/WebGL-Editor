
uniform mat4 u_WorldViewProjection;
uniform mat4 u_Projection;
uniform mat4 u_World;
uniform mat4 u_View;
uniform vec3 u_CameraPosition;


attribute vec4 a_Position;
attribute vec4 a_Color;
attribute vec2 a_UVCoordinates;
attribute vec3 a_Normal;

varying vec4 v_Position;
varying vec4 v_Color;
varying vec2 v_UVCoord;
varying vec3 v_Normal;

void main()
{
    v_Position = vec4(mat3(u_World) * vec3(a_Position), 1.0);
    v_Color = a_Color;
    v_UVCoord = a_UVCoordinates;
    gl_Position = u_WorldViewProjection * a_Position;
}