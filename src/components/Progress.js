import React from 'react';
import Window from './Window';

class Progress extends React.Component {

  render() {

    let levelTitle = "Level One", levelSubtitle = "Light Mode";
    let experienceRequired = this.props.requirements[this.props.level];

    if (this.props.level === 2){
      levelTitle = "Level Two";
      levelSubtitle = "Dark Mode";
    }
    if (this.props.level === 3){
      levelTitle = "Level Three";
      levelSubtitle = "Terminal";
    }

    if (this.props.level === 4){
      levelTitle = "THE END";
      levelSubtitle = "It's over";
    }
    
    let classes = "progress ";

    switch (this.props.level) {
      case 1:
        classes += "progress--light ";
        break;
      case 2:
        classes += "progress--dark ";
        break;
      case 3:
        classes += "progress--glitch ";
        break;
      default:
    }

    let showLevelUpButton = false;
    let experience = this.props.experience;
    if (this.props.experience > experienceRequired){
      experience = experienceRequired;
      showLevelUpButton = true;
    }

    
    let windowTitle = "Progress Bar";
    if (this.props.level === 2) windowTitle = "KPI Progress";
    if (this.props.level === 3) windowTitle = "Progress.exe";

    return (
      <Window level={this.props.level} windowClass={classes} windowTitle={windowTitle}>
        <div className="progress__title" onClick={this.props.clickEffect}>{levelTitle}</div>
        <div className="progress__subtitle">{levelSubtitle}</div>
        <div className="progress__experience-bar">
          <div className="progress__experience-bar--background" style={{width: (experience * 100 / experienceRequired) + "%"}}>
          </div>
        </div>
        <div className="progress__experience-value">{this.props.experience} Experience</div>
        <div className="progress__experience-required">{experienceRequired} to Progress</div>

        { showLevelUpButton ? 
        <div className="progress__level-up-container">
          <button className="progress__level-up-button" onClick={this.props.levelUp}>LEVEL UP!</button> 
        </div>
        : null}
      </Window>
    );
  }

}

export default Progress;