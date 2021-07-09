import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function TypistModel(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/typist.glb')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {    
    actions.Typing.loop = 2202; 
    //LoopPingPong, see https://github.com/mrdoob/three.js/blob/master/src/constants.js
    
    actions.Typing.play();
  });

  /*
  const [name, setName] = useState("typing");

  useEffect(() => {
    actions[name].reset().fadeIn(0.5).play();
    return () => actions[name].fadeOut(0.5)
  }, [name])
  */

  let eyeMaterial = materials.Eyes;
  let pantMaterial = materials.Pants;
  let shirtMaterial = materials.Shirt;
  let hairMaterial = materials.Hair;

  if (props.level === 3) {
    eyeMaterial.color = { r: 0.0, g: 1.0, b: 0.0 };
    eyeMaterial.emissive = { r: 0.0, g: 1.0, b: 0.0 };
    pantMaterial.wireframe = true;
    pantMaterial.emissive = { r: 0.0, g: 0.5, b: 0.0 };
    shirtMaterial.wireframe = true;
    shirtMaterial.emissive = { r: 0.0, g: 0.5, b: 0.0 };
    hairMaterial.wireframe = true;
    hairMaterial.emissive = { r: 0.0, g: 0.5, b: 0.0 };
  }

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="HumanArmature">
        <primitive object={nodes.Bone} />
        <skinnedMesh
          geometry={nodes.Cylinder002.geometry}
          material={materials.Skin}
          skeleton={nodes.Cylinder002.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Cylinder002_1.geometry}
          skeleton={nodes.Cylinder002_1.skeleton}
          material={eyeMaterial}
        /> 
        <skinnedMesh
          geometry={nodes.Cylinder002_2.geometry}
          material={materials.Hair}
          skeleton={nodes.Cylinder002_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Cylinder002_3.geometry}
          material={shirtMaterial}
          skeleton={nodes.Cylinder002_3.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Cylinder002_4.geometry}
          material={pantMaterial}
          skeleton={nodes.Cylinder002_4.skeleton}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/typist.glb')
