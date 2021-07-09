//https://codesandbox.io/s/t9-react-three-fiber-shadermaterial-gw4dm?file=/src/shaders/FadeShader.js:0-1165

import { Vector3 } from "three"

const RainbowShader = {
  uniforms: {
    time: {type: "f", value: 0.1},
    colorA: { type: "vec3", value: new Vector3(0.0, 0.0, 1.0)},
    colorB: { type: "vec3", value: new Vector3(1.0, 0.0, 0.0)},
    dispFactor: { type: "f", value: 0.5 },
  },
  vertexShader: `
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform vec3 colorA; 
    uniform vec3 colorB; 
    uniform float time;
    
    uniform float dispFactor;

    void main() {
      ////gl_FragColor = vec4(colorA, dispFactor);
      //vec2 uv = gl_FragCoord/iResolution.xy;

      // Time varying pixel color
      vec3 col = 0.5 + 0.5*cos(time+vUv.xyx+vec3(0,2,4));

      // Output to screen
      gl_FragColor = vec4(col, 1.0);

      //gl_FragColor = vec4(mix(colorA, colorB, vUv.x), dispFactor);
    }
  `
};

export { RainbowShader };