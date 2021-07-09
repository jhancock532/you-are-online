import React from 'react';
import Scene from './Scene';

import Introduction from './components/Introduction';
import Progress from './components/Progress';
import TodoList from './components/TodoList';
import JukeBox from './components/JukeBox';
import Social from './components/Social';
import Livestream from './components/Livestream';
import Alert from './components/Alert';
import TextParticleSystem from './components/TextParticleSystem';

import './styles/main.scss';

/*
const LEVEL_PROGRESSION = [
  "OFFLINE",
  "DEFAULT",
  "DARK_MODE",
  "GLITCH"
]*/

const EXPERIENCE_PROGRESSION_BOUNDARIES = [ 120, 240, 360 ];


class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      //visual effect state variables
      cameraPosition: 0,
      starWall: false,
      starSpeed: 0.5,
      voidLevel: 1,

      showIntroduction: true,
      experience: 0,
      level: 2, //Level 0 is offline.
      alert: { 
        title: "Alert!",
        message: "Alert message!",
        dismissal: "Dismiss",
        display: false,
      }
    }

    this.textParticleSystem = React.createRef();

    this.dismissAlert = this.dismissAlert.bind(this);
    this.displayNewAlert = this.displayNewAlert.bind(this);
    this.addExperience = this.addExperience.bind(this);
    this.toggleEffect = this.toggleEffect.bind(this);
    this.hideIntroduction = this.hideIntroduction.bind(this);
    this.setVisualEffect = this.setVisualEffect.bind(this);
  }

  toggleEffect(){
    this.setState(state => ({
      level: ((state.level + 1) % 3) + 1
    }));
  }

  setVisualEffect(key, value){
    this.setState({ [key]: value });
  }

  hideIntroduction(){
    this.setState({
      showIntroduction: false,
    })
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

  addExperience(amount, effectSpawnPosition){
    if (effectSpawnPosition === undefined) return;

    this.setState(state => ({ experience: state.experience + amount }));
    this.textParticleSystem.current.spawnExperience(amount, effectSpawnPosition);
  }

  render(){

    const visualEffects = {
      starWall: this.state.starWall,
      cameraPosition: this.state.cameraPosition,
      starSpeed: this.state.starSpeed,
      voidLevel: this.state.voidLevel,
    }

    return (
      <>
        <Scene level={this.state.level} visualEffects={visualEffects} />

        { this.state.showIntroduction ? <Introduction hideIntroduction={this.hideIntroduction}/> : null}
        <JukeBox 
          level={this.state.level}
          callAlert={this.displayNewAlert} 
          addExperience={this.addExperience} 
          setVisualEffect={this.setVisualEffect}
        />
        { this.state.level === 0 ? null : <>
        <TodoList 
          level={this.state.level}
          callAlert={this.displayNewAlert} 
          addExperience={this.addExperience}
        /></>}
        { this.state.level > 0 ? null : <>
        <Social 
          level={this.state.level} 
          callAlert={this.displayNewAlert} 
          addExperience={this.addExperience}
        /></> }
        { this.state.level > 5 ? null : <>
        <Progress 
          level={this.state.level} 
          clickEffect={this.toggleEffect} 
          experience={this.state.experience}
        />
        </>}

        <Livestream 
          level={this.state.level} 
          callAlert={this.displayNewAlert} 
          addExperience={this.addExperience}
        />

        <Alert alert={this.state.alert} level={this.state.level}  dismissAlert={this.dismissAlert}/>
        <TextParticleSystem level={this.state.level} ref={this.textParticleSystem}/>
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

    <FancyText text="Hello, world!"/>

    <OrbitControls 
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
    />
  )
}
*/