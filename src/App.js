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
import MobileIntroduction from './components/MobileIntroduction';

import './styles/main.scss';

const EXPERIENCE_REQUIREMENTS = [ 0, 120, 240, 360 ];

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      //visual effect state variables
      cameraPosition: 0,
      starWall: false,
      starSpeed: 0.5,
      voidLevel: 1,
      dehumanLevel: 0,

      showIntroduction: true,
      experience: 0,
      level: 1, //Level 0 is offline.
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
    this.levelUp = this.levelUp.bind(this);
  }

  toggleEffect(){
    this.setState(state => ({
      experience: state.experience + 20
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

  levelUp(){
    if (this.state.experience >= EXPERIENCE_REQUIREMENTS[this.state.level]) {
      this.setState(state => ({ 
        experience: 0, 
        level: state.level + 1, 
        voidLevel: state.voidLevel + 1 
      }));
    } 
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
      dehumanLevel: this.state.dehumanLevel,
    }

    if (window.innerWidth < 800){
      return (<>
        <MobileIntroduction/>
      </>)
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
        <TodoList 
          level={this.state.level}
          callAlert={this.displayNewAlert} 
          addExperience={this.addExperience}
        />
        <Progress 
          level={this.state.level} 
          clickEffect={this.toggleEffect} 
          levelUp={this.levelUp}
          requirements={EXPERIENCE_REQUIREMENTS}
          experience={this.state.experience}
        />

        { ((this.state.experience >= 60) || (this.state.level > 1)) ? 
        <Social 
          level={this.state.level} 
          callAlert={this.displayNewAlert} 
          addExperience={this.addExperience}
        /> : null }

        { (this.state.level > 1) ? 
        <Livestream 
          level={this.state.level} 
          callAlert={this.displayNewAlert} 
          addExperience={this.addExperience}
        /> : null }

        <Alert alert={this.state.alert} level={this.state.level}  dismissAlert={this.dismissAlert}/>
        <TextParticleSystem level={this.state.level} ref={this.textParticleSystem}/>
      </>
    )
  }

}

export default App;