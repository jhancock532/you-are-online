/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from "@react-three/fiber";
import { TerminalShader } from './shaders/TerminalShader';
import { StarFieldShader } from './shaders/StarFieldShader';

export default function RoomModel2(props) {
  const group = useRef()
  const wallRef = useRef()
  const screenRef = useRef()

  useFrame(() => {
    if (props.visualEffects.starWall && props.level < 3) {
      wallRef.current.material.uniforms.speed.value = props.visualEffects.starSpeed;
      wallRef.current.material.uniforms.time.value += 1.0;
    }
    if (props.visualEffects.dehumanLevel > 3) {
      screenRef.current.material.uniforms.u_time.value += 0.01;
    }
  });
  
  const { nodes, materials } = useGLTF('/room2.glb')

  /*
  useEffect(()=>{
    console.log(nodes.Side_Wall.material);
  })
  */

  let wallMaterial = <meshStandardMaterial
    attach="material"
    color={nodes.Side_Wall.material.color}
    roughness={nodes.Side_Wall.material.roughness}
    metalness={nodes.Side_Wall.material.metalness}
  />

  let screenMaterial = <meshStandardMaterial
    attach="material"
    color={materials.Screen.color}
    roughness={materials.Screen.roughness}
    metalness={materials.Screen.metalness}
  />


  if (props.visualEffects.starWall && props.level < 3){
    wallMaterial = <shaderMaterial attach="material" args={[StarFieldShader]}/>
  }
  if (props.visualEffects.dehumanLevel > 0){
    wallMaterial = <meshStandardMaterial
      attach="material"
      color="black"
      roughness={1.0}
      metalness={0.0}
      side={2}
    />
  }
  if (props.visualEffects.dehumanLevel > 3){
    screenMaterial = <shaderMaterial attach="material" side={2} args={[TerminalShader]}/>
  }

  //material={materials.Carpet}
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Camera" position={[7.13, 2.63, 5.7]} rotation={[1.51, 0.06, -0.77]} />
        <mesh
          name="Floor"
          geometry={nodes.Floor.geometry}
          position={[1.28, 0, 0]}
          rotation={[0, 0, 0]}
          scale={[5.03, 3, 4.89]}>
          { wallMaterial }
        </mesh>
        <mesh
          ref={wallRef}
          name="Side_Wall"
          geometry={nodes.Side_Wall.geometry}
          position={[1.3, 1.5, -4.5]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.55, 0.5, 1]}>
          { wallMaterial }
        </mesh>
        <mesh
          name="Back_Wall"
          geometry={nodes.Back_Wall.geometry}
          position={[-3, 1.5, 0]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[2, 1, 3]}>
          { wallMaterial }
        </mesh>
        <mesh
          name="Screen"
          ref={screenRef}
          geometry={nodes.Screen.geometry}
          material={materials.Screen}
          position={[-0.8, 1.48, -2.51]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
          scale={[0.87, 1, 0.63]}
        > 
          {screenMaterial}
        </mesh>
        
        { (props.visualEffects.voidLevel > 1) ? null : <>
        <group name="Door" position={[0.84, 0, -4.48]} rotation={[Math.PI / 2, 0, 0]} scale={[0.05, 0.06, 0.05]}>
          <mesh name="Door_188" geometry={nodes.Door_188.geometry} material={materials.DoorFrameWood} />
          <mesh name="Door_188_1" geometry={nodes.Door_188_1.geometry} material={materials.DoorWood} />
          <mesh name="Door_188_2" geometry={nodes.Door_188_2.geometry} material={materials.DoorKnob} />
        </group>
        </> }
        <mesh
          name="Ceiling"
          geometry={nodes.Ceiling.geometry}
          material={nodes.Ceiling.material}
          position={[1.36, 4.45, 0.28]}
          rotation={[0, 0, Math.PI]}
          scale={[5.05, 4.13, 5.18]}
        />
        { (props.visualEffects.voidLevel > 1) ? null : <>
        <mesh
          name="Side_Table"
          geometry={nodes.Side_Table.geometry}
          material={materials.SideTable}
          position={[-2.31, 0.46, -0.15]}
          rotation={[Math.PI / 2, 0, 0]}
        /> </>}


        { (props.visualEffects.dehumanLevel > 1) ? null : <>
        <group>
        
        { props.visualEffects.starWall ? null : <>
        <mesh
          name="PosterOne"
          geometry={nodes.PosterOne.geometry}
          material={materials.PosterOne}
          position={[-2.99, 2.89, -2.75]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={[1.17, 0.89, 0.89]}
        />
        <mesh
          name="PosterTwo"
          geometry={nodes.PosterTwo.geometry}
          material={materials.PosterTwo}
          position={[-2.99, 2.89, -2.75]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={[1.17, 0.89, 0.89]}
        />
        </> }
        <mesh
          name="DeskLeg001"
          geometry={nodes.DeskLeg001.geometry}
          material={nodes.DeskLeg001.material}
          position={[-1.66, 0.54, -3.43]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={1.17}
        />
        <mesh
          name="DeskDrawerTop001"
          geometry={nodes.DeskDrawerTop001.geometry}
          material={nodes.DeskDrawerTop001.material}
          position={[-1.66, 0.54, -3.43]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={1.17}
        />
        <group name="DeskLegBase001" position={[-1.66, 0.54, -3.43]} rotation={[Math.PI / 2, 0, 0]} scale={1.17}>
          <mesh
            name="group122835016"
            geometry={nodes.group122835016.geometry}
            material={nodes.group122835016.material}
          />
          <mesh
            name="group122835016_1"
            geometry={nodes.group122835016_1.geometry}
            material={nodes.group122835016_1.material}
          />
        </group>
        <mesh
          name="DeskDrawerTop002"
          geometry={nodes.DeskDrawerTop002.geometry}
          material={nodes.DeskDrawerTop002.material}
          position={[-1.66, 0.54, -3.43]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={1.17}
        />
        <mesh
          name="DeskDrawerTop"
          geometry={nodes.DeskDrawerTop.geometry}
          material={nodes.DeskDrawerTop.material}
          position={[-1.66, 0.54, -3.43]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={1.17}
        />
        <mesh
          name="DeskHandle001"
          geometry={nodes.DeskHandle001.geometry}
          material={nodes.DeskHandle001.material}
          position={[-1.66, 0.54, -3.43]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={1.17}
        />
        <mesh
          name="DeskWall002"
          geometry={nodes.DeskWall002.geometry}
          material={nodes.DeskWall002.material}
          position={[-1.66, 0.54, -3.43]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={1.17}
        />
        <mesh
          name="DeskHandle"
          geometry={nodes.DeskHandle.geometry}
          material={nodes.DeskHandle.material}
          position={[-1.66, 0.54, -3.43]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={1.17}
        />
        <mesh
          name="DeskDrawerFront001"
          geometry={nodes.DeskDrawerFront001.geometry}
          material={nodes.DeskDrawerFront001.material}
          position={[-1.66, 0.54, -3.43]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={1.17}
        />
        <mesh
          name="DeskHandle002"
          geometry={nodes.DeskHandle002.geometry}
          material={nodes.DeskHandle002.material}
          position={[-1.66, 0.54, -3.43]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={1.17}
        />
        <mesh
          name="DeskDrawerFront002"
          geometry={nodes.DeskDrawerFront002.geometry}
          material={nodes.DeskDrawerFront002.material}
          position={[-1.66, 0.54, -3.43]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={1.17}
        />
        <mesh
          name="DeskLeg"
          geometry={nodes.DeskLeg.geometry}
          material={nodes.DeskLeg.material}
          position={[-1.66, 0.54, -3.43]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={1.17}
        />
        <mesh
          name="DeskWall001"
          geometry={nodes.DeskWall001.geometry}
          material={nodes.DeskWall001.material}
          position={[-1.66, 0.54, -3.43]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={1.17}
        />
        <mesh
          name="DeskWall003"
          geometry={nodes.DeskWall003.geometry}
          material={nodes.DeskWall003.material}
          position={[-1.66, 0.54, -3.43]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={1.17}
        />
        <mesh
          name="DeskWall004"
          geometry={nodes.DeskWall004.geometry}
          material={nodes.DeskWall004.material}
          position={[-1.66, 0.54, -3.43]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={1.17}
        />
        <mesh
          name="DeskLegBase"
          geometry={nodes.DeskLegBase.geometry}
          material={nodes.DeskLegBase.material}
          position={[-1.66, 0.54, -3.43]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={1.17}
        />
        <mesh
          name="DeskDrawerFront"
          geometry={nodes.DeskDrawerFront.geometry}
          material={nodes.DeskDrawerFront.material}
          position={[-1.66, 0.54, -3.43]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={1.17}
        />
        <mesh
          name="DeskWall"
          geometry={nodes.DeskWall.geometry}
          material={nodes.DeskWall.material}
          position={[-1.66, 0.54, -3.43]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={1.17}
        />
        <mesh
          name="DeskSurface"
          geometry={nodes.DeskSurface.geometry}
          material={nodes.DeskSurface.material}
          position={[-1.66, 0.54, -3.43]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={1.17}
        />

        </group>
</> }
        
        { (props.visualEffects.dehumanLevel > 5) ? null :
        <mesh
          name="Computer"
          geometry={nodes.Computer.geometry}
          material={materials.Computer_mat1}
          position={[-1.03, 1.11, -2.51]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
          scale={0.14}
        /> }

        { (props.visualEffects.dehumanLevel > 3) ? null : <>
        <group>
        <mesh
          name="ChairBackBar001"
          geometry={nodes.ChairBackBar001.geometry}
          material={nodes.ChairBackBar001.material}
          position={[-2.26, 0.31, -2.53]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={1.21}
        />
        <mesh
          name="ChairBackBar002"
          geometry={nodes.ChairBackBar002.geometry}
          material={nodes.ChairBackBar002.material}
          position={[-2.26, 0.31, -2.53]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={1.21}
        />
        <mesh
          name="ChairBaseX"
          geometry={nodes.ChairBaseX.geometry}
          material={nodes.ChairBaseX.material}
          position={[-2.26, 0.45, -2.53]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={1.21}
        />
        <mesh
          name="ChairBackBar003"
          geometry={nodes.ChairBackBar003.geometry}
          material={nodes.ChairBackBar003.material}
          position={[-2.26, 0.31, -2.53]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={1.21}
        />
        <mesh
          name="ChairBack"
          geometry={nodes.ChairBack.geometry}
          material={nodes.ChairBack.material}
          position={[-2.26, 0.31, -2.53]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={1.21}
        />
        <mesh
          name="ChairAdjustPedal"
          geometry={nodes.ChairAdjustPedal.geometry}
          material={nodes.ChairAdjustPedal.material}
          position={[-2.26, 0.31, -2.53]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={1.21}
        />
        <mesh
          name="ChairSeat"
          geometry={nodes.ChairSeat.geometry}
          material={nodes.ChairSeat.material}
          position={[-2.26, 0.31, -2.53]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={1.21}
        />
        <group
          name="ChairWheel001"
          position={[-2.26, 0.45, -2.53]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={1.21}>
          <mesh
            name="group1306767648"
            geometry={nodes.group1306767648.geometry}
            material={nodes.group1306767648.material}
          />
          <mesh
            name="group1306767648_1"
            geometry={nodes.group1306767648_1.geometry}
            material={nodes.group1306767648_1.material}
          />
          <mesh
            name="group1306767648_2"
            geometry={nodes.group1306767648_2.geometry}
            material={nodes.group1306767648_2.material}
          />
        </group>
        <group
          name="ChairWheel002"
          position={[-2.26, 0.45, -2.53]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={1.21}>
          <mesh
            name="group1665730989"
            geometry={nodes.group1665730989.geometry}
            material={nodes.group1665730989.material}
          />
          <mesh
            name="group1665730989_1"
            geometry={nodes.group1665730989_1.geometry}
            material={nodes.group1665730989_1.material}
          />
          <mesh
            name="group1665730989_2"
            geometry={nodes.group1665730989_2.geometry}
            material={nodes.group1665730989_2.material}
          />
        </group>
        <mesh
          name="ChairBackBar"
          geometry={nodes.ChairBackBar.geometry}
          material={nodes.ChairBackBar.material}
          position={[-2.26, 0.31, -2.53]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={1.21}
        />
        <mesh
          name="ChairUnderSeat"
          geometry={nodes.ChairUnderSeat.geometry}
          material={nodes.ChairUnderSeat.material}
          position={[-2.26, 0.31, -2.53]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={1.21}
        />
        <group
          name="ChairWheel003"
          position={[-2.26, 0.45, -2.53]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={1.21}>
          <mesh
            name="group1933021004"
            geometry={nodes.group1933021004.geometry}
            material={nodes.group1933021004.material}
          />
          <mesh
            name="group1933021004_1"
            geometry={nodes.group1933021004_1.geometry}
            material={nodes.group1933021004_1.material}
          />
          <mesh
            name="group1933021004_2"
            geometry={nodes.group1933021004_2.geometry}
            material={nodes.group1933021004_2.material}
          />
        </group>
        <mesh
          name="ChairCentreMainBar"
          geometry={nodes.ChairCentreMainBar.geometry}
          material={nodes.ChairCentreMainBar.material}
          position={[-2.26, 0.39, -2.53]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={[1.21, 1.21, 0.79]}
        />
        <mesh
          name="ChairAdjustTip"
          geometry={nodes.ChairAdjustTip.geometry}
          material={nodes.ChairAdjustTip.material}
          position={[-2.26, 0.31, -2.53]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={1.21}
        />
        <group name="ChairWheel" position={[-2.26, 0.45, -2.53]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={1.21}>
          <mesh
            name="group2136273154"
            geometry={nodes.group2136273154.geometry}
            material={nodes.group2136273154.material}
          />
          <mesh
            name="group2136273154_1"
            geometry={nodes.group2136273154_1.geometry}
            material={nodes.group2136273154_1.material}
          />
          <mesh
            name="group2136273154_2"
            geometry={nodes.group2136273154_2.geometry}
            material={nodes.group2136273154_2.material}
          />
        </group>
        </group>
        </> }
        { (props.visualEffects.voidLevel > 2) ? null : <>
        <group name="model001" position={[-2.33, 1.23, -0.16]} rotation={[Math.PI / 2, 0, 1.42]}>
          <mesh name="model001_1" geometry={nodes.model001_1.geometry} material={materials.StandFrame} />
          <mesh name="model001_2" geometry={nodes.model001_2.geometry} material={materials.StandImage} />
          <mesh name="model001_3" geometry={nodes.model001_3.geometry} material={materials.StandBack} />
          <mesh name="model001_4" geometry={nodes.model001_4.geometry} material={materials.StandWindow} />
        </group>
        </> }
      </group>
    </group>
  )
}

useGLTF.preload('/room2.glb')

/*

        */