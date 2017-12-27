precision mediump float;

varying vec4 varying_color;
void main(void)	{
  // gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
  gl_FragColor = varying_color;
}
