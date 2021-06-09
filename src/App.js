//import * as THREE from "three"

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber' //useFrame
import { PerspectiveCamera, OrbitControls, Stats } from '@react-three/drei'
//import create from "zustand";

import Model from './Charmodel'
import FancyText from './FancyText'

import XPBar from './components/XPBar'
import TodoList from './components/TodoList'
import JukeBox from './components/JukeBox'
import Alert from './components/Alert'

import './styles/main.scss';

//import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing'

/*
const useStore = create((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 }))
}));
*/

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      alert: { 
        title: "Alert!",
        message: "Alert message!",
        dismissal: "Dismiss",
        display: true,
      }
    }

    this.dismissAlert = this.dismissAlert.bind(this);
    this.displayNewAlert = this.displayNewAlert.bind(this);
  }

  dismissAlert(){
    this.setState({
      alert: {
        display: false
      }
    })
  }

  displayNewAlert(alertObject){
    this.setState({
      alert: {
        title: alertObject.title,
        message: alertObject.message,
        dismissal: alertObject.dismissal,
        display: true
      }
    })
  }

  render(){
    return (
      <>
        <Canvas>
          <PerspectiveCamera position={[0, 5, 5]} />
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
          />
          <Suspense fallback={null}>
            <Model />
          </Suspense>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <FancyText text="Hello, world!"/>
          <Stats showPanel={0} className="stats" />
        </Canvas>
  
        <TodoList callAlert={this.displayNewAlert}/>
        <XPBar />
        <JukeBox callAlert={this.displayNewAlert}/>
        <Alert alert={this.state.alert} dismissAlert={this.dismissAlert}/>
        
      </>
    )
  }

}


export default App;


/*

      <EffectComposer>
        <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
        <Noise opacity={0.02} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </Canvas>
  )
}
*/