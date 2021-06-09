import React from 'react';
import Window from './Window';

class Alert extends React.Component {

  constructor(props) {
    super(props);

    this.dismissAlert = this.dismissAlert.bind(this);
  }

  dismissAlert(){
    this.props.dismissAlert();
  }

  render() {
    if ( this.props.alert.display ) {
      return (
        <div className="alert__background">
          <Window windowClass="alert" windowTitle={this.props.alert.title} exitButton={false}>
            <p className="alert__message">{this.props.alert.message}</p>
            <button className="alert__dismiss-button" onClick={this.dismissAlert}>{this.props.alert.dismissal}</button>
          </Window>
        </div>
      );
    } else {
      return null;
    }
  }

}

export default Alert;