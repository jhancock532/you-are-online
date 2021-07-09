//Based on the shader by BonsaiDen, I've tweaked it to add motion
//https://gist.github.com/BonsaiDen/ad7075c9bc415da9393a

//Other interesting StarField shaders
//https://www.shadertoy.com/view/lsc3z4
//https://github.com/JesseSolomon/starfield/blob/main/public/fragment.glsl

import { Vector2, Vector3 } from "three";

const StarFieldShader = {
  uniforms: {
    time: {type: "f", value: 0.1},
    speed: {type: "f", value: 1.0},
    colorA: { type: "vec3", value: new Vector3(0.0, 0.0, 1.0)},
    colorB: { type: "vec3", value: new Vector3(1.0, 0.0, 0.0)},
    resolution: {type: "vec2", value: new Vector2(1000.0, 800.0)},
  },
  vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
  `,
  fragmentShader: `
    varying vec2 vUv;

    uniform vec2 resolution;
    uniform float time;
    uniform float speed;
    uniform vec3 colorA; 
    uniform vec3 colorB; 
    
    vec3 mod289(vec3 x) {
      return x - floor(x * (1.0 / 239.0)) * 239.0;
    }

    vec2 mod289(vec2 x) {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }

    vec3 permute(vec3 x) {
      return mod289(((x*34.0)+1.0)*x);
    }

    float snoise(vec2 v) {

      const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                          0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                        -0.577350269189626,  // -1.0 + 2.0 * C.x
                          0.024390243902439); // 1.0 / 41.0
      // First corner
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);

      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;

      i = mod289(i); // Avoid truncation effects in permutation
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));

      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;

      return 151.0 * dot(m, g); //tweak 152.0 to get more / less stars
    }

    float star(vec2 p) {
      return step(0.49, smoothstep(0.80, 1.0, snoise(p)));  
    }

    void main(void) {
        
      vec2 p = gl_FragCoord.xy;

      //This controls the speed and direction of the star layers
      vec2 o = vec2(cameraPosition.x * time * speed * 0.5, cameraPosition.y * 0.5);

      // star layers
      float s1 = star(p + floor(o * 1.1));
      float s2 = star(p + floor(o * 0.75) + vec2(-20.0, 10.0));
      float s3 = star(p + floor(o * 0.5) + vec2(-75.0, 25.0));
      
      float g = smoothstep(0.10, 1.0,snoise(p));
      if (s1 > 0.0) {
          s1 -= g * 0.25;
      }
      if (s2 > 0.0) {
          s2 += g * 0.75;
      }
      
      if (s3 > 0.0) {
          s3 += g * 0.5;
      }

      // Time varying pixel color from the rainbow shader
      vec3 col = 0.1 + 0.5*cos(time * speed * 0.01 + vUv.xyx + vec3(0,2,4));
      
      float val = (s1 * 1.0 + s2 * 0.50 + s3 * 0.25);

      if (val < 0.01) {
        gl_FragColor = vec4(col, 1.0);
      } else {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
      }
        
    }
  `
};

export { StarFieldShader };