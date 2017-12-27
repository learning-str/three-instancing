attribute vec4 color;
varying vec4 varying_color;
void main(void)	{
  gl_Position = vec4(position, 1.0);
  gl_PointSize = 180.0;
  varying_color = color;
}
