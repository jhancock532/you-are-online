//Based on the shader by Book of Shaders

import { Vector2 } from "three";

const TerminalShader = {
  uniforms: {
    u_time: {type: "f", value: 0.1},
    u_speed: {type: "f", value: 0.5},
    u_resolution: {type: "vec2", value: new Vector2(450.0, 450.0)},
  },
  vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
  `,
  fragmentShader: `
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_speed;

  float random (in float x) {
    return fract(sin(x)*1e4);
  }

  float random (in vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
  }

  float pattern(vec2 st, vec2 v, float t) {
      vec2 p = floor(st+v);
      return step(t, random(100.+p*.000001)+random(p.x)*0.5 );
  }

  void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    float xSkew = 0.0;
    float ySkew = -0.3;
    float rotation = 0.2;

    mat3 trans = mat3(
      1.0       , tan(xSkew), 0.0,
      tan(ySkew), 1.0,        0.0,
      0.0       , 0.0,        1.0
    );

    mat2 rotate = mat2(
      cos(rotation), -sin(rotation),
      sin(rotation), cos(rotation)
    );

    st = (trans * (vec3(st.xy, 0.0))).xy;
    st = rotate * st.xy; 

    vec2 grid = vec2(100.0,50.);
    st *= grid;

    vec2 ipos = floor(st);  // integer
    vec2 fpos = fract(st);  // fraction

    vec2 vel = vec2(u_time*u_speed*max(grid.x,grid.y)); // time
    vel *= vec2(-1.,0.0) * random(1.0+ipos.y); // direction

    // Assign a random value base on the integer coord
    vec2 offset = vec2(0.1,0.);

    vec3 color = vec3(0.);
    color.r = pattern(st+offset,vel,0.5);
    color.g = pattern(st,vel,0.5);
    color.b = pattern(st-offset,vel,0.5);

    // Margins
    color *= step(0.2,fpos.y);

    gl_FragColor = vec4(0.0, color.x * 0.8, 0.0 ,1.0);
  }
  `
};

export { TerminalShader };