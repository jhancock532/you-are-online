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

    let classes = "alert ";
    let backgroundClass = "alert__background ";

    switch (this.props.level) {
      case 1:
        classes += "alert--light ";
        backgroundClass += "alert__background--light";
        break;
      case 2:
        classes += "alert--dark ";
        backgroundClass += "alert__background--dark";
        break;
      case 3:
        classes += "alert--glitch ";
        backgroundClass += "alert__background--glitch";
        break;
      default:
    }

    if ( this.props.alert.display ) {
      return (
        <div className={backgroundClass}>
          <Window windowClass={classes} windowTitle={this.props.alert.title} notMinimisable noExitButton alert>
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