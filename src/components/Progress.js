import React from 'react';
import Window from './Window';

class Progress extends React.Component {

  render() {

    let levelTitle = "Level One";
    let levelSubtitle = "Light Mode";
    let experienceRequired = 150;
    if (this.props.level === 2){
      levelTitle = "Level Two";
      levelSubtitle = "Dark Mode";
      experienceRequired = 300;
    }
    if (this.props.level === 3){
      levelTitle = "Level Three";
      levelSubtitle = "Terminal";
      experienceRequired = 450;
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

    return (
      <Window level={this.props.level} windowClass={classes} windowTitle="Progress">
        <div className="progress__title" onClick={this.props.clickEffect}>{levelTitle}</div>
        <div className="progress__subtitle">{levelSubtitle}</div>
        <div className="progress__experience-bar">
          <div className="progress__experience-bar--background" style={{width: (this.props.experience * 100 / experienceRequired) + "%"}}>
          </div>
        </div>
        <div className="progress__experience-value">{this.props.experience} Experience</div>
        <div className="progress__experience-required">{experienceRequired} to Progress</div>
      </Window>
    );
  }


}

export default Progress;