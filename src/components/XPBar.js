import React from 'react';
import Window from './Window';

class XPBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = { experience: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <Window windowClass="progress-bar" windowTitle="Experience">
        <div className="progress-bar--experience">
          <div className="progress-bar--experience__value">{this.state.experience}/100</div>
          <div className="progress-bar--experience-background" style={{width: this.state.experience + "%"}}>
          </div>
          <button onClick={this.handleClick}>Add Experience</button>
        </div>
      </Window>
    );
  }

  handleClick(e) {
    e.preventDefault();
    this.setState(state => ({
      experience: state.experience + 1
    }));
  }

}

export default XPBar;