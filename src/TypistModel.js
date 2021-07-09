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
    //console.log(actions);
  });
  /*
  const [name, setName] = useState("typing");

  useEffect(() => {
    actions[name].reset().fadeIn(0.5).play();
    return () => actions[name].fadeOut(0.5)
  }, [name])
  */

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
          material={materials.Eyes}
          skeleton={nodes.Cylinder002_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Cylinder002_2.geometry}
          material={materials.Hair}
          skeleton={nodes.Cylinder002_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Cylinder002_3.geometry}
          material={materials.Shirt}
          skeleton={nodes.Cylinder002_3.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Cylinder002_4.geometry}
          material={materials.Pants}
          skeleton={nodes.Cylinder002_4.skeleton}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/typist.glb')
