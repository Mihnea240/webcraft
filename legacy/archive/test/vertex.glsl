attribute vec4 a_position;
attribute vec4 a_color;
varying vec4 vColor;

void main() {
	gl_Position = a_position;
	vColor = a_color;
}