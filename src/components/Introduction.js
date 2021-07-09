import React from 'react';

class Introduction extends React.Component {

  constructor(props) {
    super(props);

    this.dismissAlert = this.dismissAlert.bind(this);
  }

  dismissAlert(){
    this.props.dismissAlert();
  }

  render() {
    return (
      <div className="introduction__background">
        <div className="introduction">
          <h1 className="introduction__title">YOU-ARE.ONLINE</h1>
          <h3 className="introduction__subtitle">Desktop Edition</h3>
          <p className="introduction__instructions">
            Please set your volume to a low level.
          </p>
          <button className="introduction__start-button" onClick={this.props.hideIntroduction}>
            Click Here to Start
          </button>
        </div>
      </div>
    );
  }

}

export default Introduction;

