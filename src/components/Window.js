import React from 'react';
import Draggable from 'react-draggable';
import { VscChromeClose, VscArrowRight } from 'react-icons/vsc';
import { GrAlert } from 'react-icons/gr';

class Window extends React.Component {

  render() {

    let windowClasses = "window ";

    if ( this.props.windowClass === "alert" ) {
      windowClasses += "window--alert ";
    } else {
      windowClasses += "window--normal ";
    }

    windowClasses += this.props.windowClass;

    return (
      <Draggable handle=".window__title" bounds="parent">
          <div className={windowClasses}>
            <div className="window__header">

              { (this.props.windowClass === "alert") ?
                <div className="window__title">
                  <GrAlert className="window__title-alert"/> {this.props.windowTitle}
                </div>
              :
                <div className="window__title">
                  <VscArrowRight className="window__title-arrow"/> {this.props.windowTitle}
                </div>
              }

              { (this.props.exitButton === true) ? 
                <div className="window__close" onClick={this.props.windowClose}>
                  <VscChromeClose />
                </div>
                : <></>
              }
            </div>
            <div className="window__content">
              {this.props.children}
            </div>
          </div>
      </Draggable>
    )
  }

}

export default Window;