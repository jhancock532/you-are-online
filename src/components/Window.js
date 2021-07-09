import React from 'react';
import Draggable from 'react-draggable';
import { VscChromeClose, VscArrowRight, VscChromeMaximize, VscChromeMinimize } from 'react-icons/vsc';
import { GrAlert } from 'react-icons/gr';

class Window extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      minimised: false,
    }

    this.toggleMinimise = this.toggleMinimise.bind(this);
  }

  toggleMinimise(){
    this.setState( state => ({
      minimised: !state.minimised,
    }));
  }

  render() {

    let windowClasses = "window ";

    if ( this.props.alert ) {
      switch (this.props.level) {
        case 1:
          windowClasses += "alert alert--light";
          break;
        case 2:
          windowClasses += "alert alert--dark";
          break;
        case 3:
          windowClasses += "alert alert--glitch";
          break;
        default:
      }
    } else {
      
      switch (this.props.level) {
        case 1:
          windowClasses += "window--light ";
          break;
        case 2:
          windowClasses += "window--dark ";
          break;
        case 3:
          windowClasses += "window--glitch ";
          break;
        default:
      }
      
    }

    windowClasses += this.props.windowClass;

    return (
      <Draggable handle=".window__title" bounds="parent">
        <div className={windowClasses}>
          <div className="window__header">

            { this.props.alert ?
              <div className="window__title">
                <GrAlert className="window__title-alert"/> {this.props.windowTitle}
              </div>
            :
              <div className="window__title">
                <VscArrowRight className="window__title-arrow"/> {this.props.windowTitle}
              </div>
            }

            { this.props.notMinimisable ? null :
              <div className="window__minimise-toggle" onClick={this.toggleMinimise}>
                { this.state.minimised ? <VscChromeMaximize className="window__maximise-icon"/>
                : <VscChromeMinimize className="window__minimise-icon"/>}
              </div>
            }

            { this.props.noExitButton ? null :
              <div className="window__close" onClick={this.props.windowClose}>
                <VscChromeClose className="window__close-icon"/>
              </div>
            }
          </div>
            

          { (this.state.minimised && !this.props.notMinimisable) ? null :
            <div className="window__content">
              {this.props.children}
            </div>
          }
        </div>
      </Draggable>
    )
  }

}

export default Window;