attribute vec3 a_Position;
attribute vec4 a_Color;
attribute vec2 a_UVCoordinates;

uniform mat4 u_WorldViewProjection;
uniform mat4 u_WorldMatrix;
uniform mat4 u_ProjectionMatrix;

varying vec2 uvCoords;
varying vec4 color;

void main() {
  //gl_Position = u_WorldViewProjection * vec4(a_Position, 1.0);
  gl_Position =  u_ProjectionMatrix * u_WorldMatrix * vec4(a_Position, 1.0);
  uvCoords = a_UVCoordinates;
  color = a_Color;
}