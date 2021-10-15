/* SOCIAL.JS */
//This part caused me a lot of trouble with resetting CSS animations to play again.
//The solution was an if statement that added / removed the CSS class depending on state

  /*
  handleRefreshButton(){

  if (this.state.refreshReady && (this.state.postsSubmitted > 0)){

    const generalNotifications = Math.floor(Math.random() * 3 + Math.random() * 4 * this.state.postsSubmitted);
    const messageNotifications = Math.floor(Math.random() * 1 + Math.random() * 1 * this.state.postsSubmitted);
    const heartNotifications = Math.floor(Math.random() * 8 + Math.random() * 10 * this.state.postsSubmitted);
    const followerNotifications = Math.floor(Math.random() * 2 + Math.random() * 2 * this.state.postsSubmitted);

    this.setState(state => ({
      refreshReady: false,
      postsSubmitted: 0,
      notifications: {
        general: state.notifications.general + generalNotifications,
        messages: state.notifications.messages + messageNotifications,
        hearts: state.notifications.hearts + heartNotifications,
        followers: state.notifications.followers + followerNotifications
      }
    }));

    //Another early attempt at the CSS Spin animation...
    //Get all the elements with social__notification__bubble__lottery-number class
    //apply the spin animation class to trigger the animation once, 
    //then after it finishes, remove it with a setTimeout
    //This is a horrible solution, I should probably use GSAP or something?
    //social__notification__bubble__lottery-spin

    
    const lotteryNumbers = document.getElementsByClassName("social__notification__bubble__lottery-number");
    for (let i = 0; i < lotteryNumbers; i++){
      lotteryNumbers[i].classList.add("social__notification__bubble__lottery-spin");

      setTimeout(() => { 
        lotteryNumbers[i].classList.remove("social__notification__bubble__lottery-spin");
      }, 3000);
    }
  }

  }
  */

  /*
  //An early attempt at resetting the CSS lottery spin animation...
  onAnimationEnd(){
    const lotteryNumbers = document.getElementsByClassName("social__notification__bubble__lottery-number");
    
    console.log(lotteryNumbers);
    for (let i = 0; i < lotteryNumbers; i++){
      lotteryNumbers[i].classList.remove("social__notification__bubble__lottery-spin");
    }

  }*/

  /*

  //Shader materials... Animating these transitions is going to be difficult.

class CustomMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: { color: { value: new THREE.Color("white") } },
      vertexShader: `...`,
      fragmentShader: `...`
    })
  }
  get color() {
    return this.uniforms.color.value
  }
}

// Swapping out materials with conditionals, but this gets much more complicated.

          { props.visualEffects.starWall ? 
          <shaderMaterial
            attach="material"
            args={[StarFieldShader]}
          /> : <meshStandardMaterial
          attach="material"
          color={nodes.Back_Wall.material.color}
          roughness={nodes.Back_Wall.material.roughness}
          metalness={nodes.Back_Wall.material.metalness}/> }

*/

// I experimented a fair bit with Three-React-Fibre and its surrounding ecosystem before starting.
// Still worth adding some postprocessing maybe :)

//import { PerspectiveCamera, OrbitControls, Stats } from '@react-three/drei';
//import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing'

//https://codesandbox.io/s/react-spring-gykbc?from-embed=&file=/src/App.js

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