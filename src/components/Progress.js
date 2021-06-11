import React from 'react';
import Window from './Window';

class Progress extends React.Component {

  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <Window windowClass="progress" windowTitle="Progress">
        <div className="progress__level-container">
          <div className="progress__level">
            <p>Level</p>
            <h1>1</h1>
          </div>
          <div className="progress__level">
            <p>Level</p>
            <h1>2</h1>
          </div>
          <div className="progress__level">
            <p>Level</p>
            <h1>3</h1>
          </div>
        </div>
        <div className="progress__experience">
          <div className="progress__experience-value">{this.props.experience}/100</div>
          <div className="progress__experience-background" style={{width: this.props.experience + "%"}}>
          </div>
        </div>
      </Window>
    );
  }


}

export default Progress;