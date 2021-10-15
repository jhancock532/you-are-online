import React from 'react';

class MobileIntroduction extends React.Component {

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
          <h1 className="introduction__title">YOU ARE ONLINE</h1>
          <h3 className="introduction__subtitle">Mobile Edition</h3>
          <p className="introduction__instructions">
            This website sadly doesn't support mobile devices. 
            Please visit it on a desktop computer, or...
            <br/><br/>
            <a style={{background: "yellow", padding: "4px"}} href="https://galvanised.show/james">Read more about the piece.</a>
          </p>
        </div>
      </div>
    );
  }

}

export default MobileIntroduction;

