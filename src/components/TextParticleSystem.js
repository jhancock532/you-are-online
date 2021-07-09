import React from 'react';

class TextParticleSystem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      particles: [],
    }

    //We want to clean up all the particles that are dead every 3 seconds
    //with a setTimeout?
    //Whenever the props are updated by the parent with a new particle, 
    //that particle is added to this components state and a callback destorys the parent state
    //why can't the parent just call a function of the child?

    //So this seems to be a common problem...
    //https://stackoverflow.com/questions/37949981/call-child-method-from-parent

  }

  spawnExperience(amount, effectSpawnPosition) {

    const element = document.createElement("div");
    element.classList.add("text-particle-system__particle");
    let message = "";

    switch (this.props.level) {
      case 1:
        element.setAttribute("light", "");
        break;
      case 2:
        element.setAttribute("dark", "");
        break;
      case 3:
        element.setAttribute("glitch", "");
        break;
      default:
    }

    if (amount > 0){
      element.classList.add("text-particle-system__particle--positive");
      message += "+" + amount + " EXP";
    }
    if (amount === 0) {
      element.classList.add("text-particle-system__particle--neutral");
      message += amount + " EXP";
    }
    if (amount < 0) {
      element.classList.add("text-particle-system__particle--negative");
      message += amount + " EXP";
    }

    element.style.top = effectSpawnPosition.y + "px";
    element.style.left = effectSpawnPosition.x + "px";

    const content = document.createTextNode(message);
  
    element.appendChild(content);
    const container = document.getElementById("TextParticleSystem");
    container.appendChild(element)

    setTimeout(() => {
      element.remove();
    }, 2000)
  }

  render() {
    return (
      <div className="text-particle-system" id="TextParticleSystem"></div>
    );
  }


}

export default TextParticleSystem;