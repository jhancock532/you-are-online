import RoomModel2 from './RoomModel2';
import TypistModel from './TypistModel';
import LoadingSplash from './components/LoadingSplash';

import * as THREE from 'three'
import React, { Suspense } from 'react';
//import { useTransition, a } from 'react-spring'
import { Canvas, useFrame } from '@react-three/fiber';
//import { useSpring, animated } from 'react-spring/three';
import { Stats } from '@react-three/drei';

//import { PerspectiveCamera, OrbitControls, Stats } from '@react-three/drei';
//import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing'

//https://codesandbox.io/s/react-spring-gykbc?from-embed=&file=/src/App.js

function CameraMovement(props) {

  useFrame((state) => {

    const step = 0.1;
    const cameraDetails = {};

    let positionNumber = props.position;
    if (props.level === 1) positionNumber = 0;
    if (props.level === 2) positionNumber = 1;
    if (props.level === 3) positionNumber = 2;

    //Let the camera change from default if flow effect playing.
    if (props.position === 3) positionNumber = 3;

    switch (positionNumber) {
      case 0: //Default, looks a bit weird with the door.
        cameraDetails["position"] = new THREE.Vector3(3, 2, -1);
        cameraDetails["fov"] = 30;
        break;
      case 1: //Close up for starwall flow effect. No door visible.
        cameraDetails["position"] = new THREE.Vector3(2, 2, -0.5);
        cameraDetails["fov"] = 25;
        break;
      case 2: //Looking down, surveillance style
        cameraDetails["position"] = new THREE.Vector3(3.0, 2.7, 1);
        cameraDetails["fov"] = 17;
        break;
      case 3: //Close up for starwall flow effect. No door visible.
        cameraDetails["position"] = new THREE.Vector3(2, 2, -0.5);
        cameraDetails["fov"] = 25;
        break;
      default:
        cameraDetails["position"] = new THREE.Vector3(1.4, 1.9, -0.1);
        cameraDetails["fov"] = 30;
        break;
    }

    state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, cameraDetails.fov, step);
    state.camera.position.lerp(cameraDetails.position, step);
    state.camera.lookAt(-1.7, 1.6, -3.1);
    state.camera.updateProjectionMatrix();

  });

  return null;
}

export default function Scene(props) {

  const lightmodeLighting = <>
    <ambientLight intensity={0.5} />
    <spotLight position={[20, 20, 20]} angle={0.15} penumbra={1} />
    <pointLight position={[-10, -10, -10]} />
  </>;

  const darkmodeLighting = <>
    <ambientLight intensity={0.2} color="grey"/>
    <spotLight position={[20, 20, 20]} color="grey" angle={0.15} penumbra={1} />
    <pointLight distance={2} intensity={1} position={[-1.03, 1.11, -2.51]} color="white"/>
  </>;

  const glitchLighting = <>
    <ambientLight intensity={0.5} color="green" />
    <spotLight intensity={0.9} position={[20, 20, 20]} color="green" angle={0.15} penumbra={1}  />
    <pointLight distance={4} intensity={1} position={[-1.03, 1.41, -2.61]} color="green" />
  </>;

  return (
    <>
    <Canvas 
      gl = {{alpha: false}}
      onCreated={state => state.camera.lookAt(-1.7, 1.6, -3.1)} 
      camera={{ position: [3, 2, -1], fov: 30 }}
    >
      <Suspense fallback={<LoadingSplash />}>
        <group position={[-1.7, 0.05, -2.55]} scale={[0.6, 0.6, 0.6]} rotation={[0, Math.PI / 2 -0.2, 0]}>
          <TypistModel visualEffects={props.visualEffects} level={props.level}/>
        </group>
        <RoomModel2 visualEffects={props.visualEffects} level={props.level}/>
      </Suspense>
      
      { props.level === 1 ? lightmodeLighting : null}
      { props.level === 2 ? darkmodeLighting : null}
      { props.level === 3 ? glitchLighting : null}

      <CameraMovement position={props.visualEffects.cameraPosition} level={props.level} />
      { false ? null : <Stats showPanel={0} className="stats" /> }
    </Canvas>
    </>
  )
}



  /*
            <PerspectiveCamera position={[1, 2, -1.5]} />
          <OrbitControls 
            minPolarAngle={Math.PI * 1 / 4}
            maxPolarAngle={Math.PI * 2.8 / 4}
            minAzimuthAngle={-Math.PI * 0.5 / 3}
            maxAzimuthAngle={Math.PI * 2 / 3}
            minDistance={0}
            maxDistance={0.5}
            target={new Vector3(1, 2, -1.5)}
            enablePan={true}
            enableZoom={false}
            enableRotate={true}
          />

                  <Canvas camera={{ position: [4, 2, -1], fov: 100 }}>
          
          <Suspense fallback={null}>
            <group position={[-1.7, 0.1, -2.55]} scale={[0.6, 0.6, 0.6]} rotation={[0, Math.PI / 2, 0]}>
              <TypistModel />
            </group>
            <RoomModel2 />
          </Suspense>
          
          <ambientLight intensity={0.5} />
          <spotLight position={[20, 20, 20]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          
          <Stats showPanel={0} className="stats" />

                <EffectComposer>
        <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
        <Noise opacity={0.02} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
        </Canvas>
  */