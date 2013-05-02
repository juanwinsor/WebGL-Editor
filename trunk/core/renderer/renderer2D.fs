precision mediump float;

uniform sampler2D u_Texture;

varying vec2 uvCoords;
varying vec4 color;

void main() {
  gl_FragColor = color * texture2D(u_Texture, uvCoords);
}