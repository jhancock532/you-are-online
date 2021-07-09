import React from 'react';
import Window from './Window';
import { BsHeartFill } from 'react-icons/bs';

const usernames = [
  "Asher",
  "Aviservic",
  "Backland",
  "Crooklack",
  "Czarfini",
  "Gilector",
  "Ginodyme",
  "GodzillaLand",
  "Linklect",
  "Luminda",
  "LummoFraser",
  "Manneyer",
  "MaxIte",
  "Megadsca",
  "NayborActive",
  "Netwolfch",
  "QuantActually",
  "Razuri",
  "RecipeEvents",
  "RosaWwjd",
  "ShcamMon",
  "SlipkBugs",
  "Sozotyp",
  "Suryonlo",
  "Targetroom",
  "Trueferra",
  "Vanstated",
  "Webloger",
  "WillowsScary",
  "YugiDigy"
]

const messages = [
  "💖",
  "😍",
  "💟",
  "💘",
  "💗"
]

//Streamer images thanks to 
//https://unsplash.com/@higorrss (1, 2, 3)
//https://unsplash.com/@uusaez (4)
//https://www.pexels.com/@rodnae-prod (5)


function ChatMessage(props) {
  return (
    <div className="livestream__chat-message">
      <div className="livestream__message-author">{props.author}</div>
      <div>:</div>
      <div className="livestream__message-content">{props.message}</div>
    </div>
  )
}

class Livestream extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      streamerImage: 0,
      chatMessages: [],
      viewers: 12,
      hearts: 1,
    }

    this.endOfMessages = React.createRef();

    this.attemptToClose = this.attemptToClose.bind(this);
    this.postHeartMessage = this.postHeartMessage.bind(this);
  }

  generateMessage(){
    const length = Math.ceil(Math.random() * 5);
    let message = "";

    for (let i = 0; i < length; i++){
      message += messages[Math.floor(Math.random()*messages.length)];
    }

    return message;
  }

  componentDidMount(){

    this.streamerImageInterval = setInterval(() => {
      this.setState( state => ({
        streamerImage: ( state.streamerImage + 1 ) % 5,
      }))
    }, 5000);

    this.viewerInterval = setInterval(() => {
      this.setState( state => ({
        viewers: ( state.viewers + Math.round(Math.random() * 5 - 2) ),
      }))
    }, 2000);

    this.chatInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        let newMessage = { 
          username: usernames[Math.floor(Math.random()*usernames.length)],
          message: this.generateMessage()
        }

        this.setState(state => ({
          chatMessages: [...state.chatMessages, newMessage],
          hearts: state.hearts + newMessage.message.length / 2,
        }))

        if (this.state.chatMessages.length > 20){
          const reducedMessages = [...this.state.chatMessages];
          reducedMessages.splice(-10);
          this.setState({
            chatMessages: reducedMessages
          })
        }

      }
    }, 500);

  }

  componentWillUnmount(){
    clearInterval(this.streamerImageInterval);
    clearInterval(this.viewerInterval);
    clearInterval(this.chatInterval);
  }

  postHeartMessage(event) {

    let messageLength = Math.ceil(Math.random() * 4);
    let message = "";

    for (let i = 0; i < messageLength; i++){
      message += event.target.innerText;
    }

    let newMessage = { 
      username: "You",
      message: message,
    }
    this.setState(state => ({
      chatMessages: [...state.chatMessages, newMessage]
    }))

    this.setState( state => ({
      hearts: ( state.hearts + messageLength ),
    }))

    const boundingRectangle = event.currentTarget.getBoundingClientRect();
    const effectSpawnPosition = {x: boundingRectangle.x + 5, y: boundingRectangle.y - 15}
    this.props.addExperience(messageLength, effectSpawnPosition);

    const timeOutTime = 2000 + Math.floor(Math.random() * 5000);
    event.target.classList.add("livestream__chat-button--deactivated");
    setTimeout(()=>{
      event.target.classList.remove("livestream__chat-button--deactivated");
    }, timeOutTime)
  }

  attemptToClose(){

    this.props.callAlert({
      title: "Don't leave me...",
      message: "I'm tired but I won't stop.",
      dismissal: "♥",
    });

  }

  scrollToBottom = () => {
    if (this.endOfMessages != null)
    this.endOfMessages.scrollIntoView(); //{ behavior: "smooth" }
  }
  
  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {

    let classes = "livestream ";

    switch (this.props.level) {
      case 1:
        classes += "livestream--light ";
        break;
      case 2:
        classes += "livestream--dark ";
        break;
      case 3:
        classes += "livestream--glitch ";
        break;
      default:
    }

    const chatMessages = this.state.chatMessages.map((message, index) => 
      <ChatMessage key={index} author={message.username} message={message.message}/>
    );

    let streamerImageURL;
    switch (this.state.streamerImage) {
      case 0:
        streamerImageURL = "/img/streamer1.jpg"
        break;
      case 1:
        streamerImageURL = "/img/streamer4.jpg"
        break;
      case 2:
        streamerImageURL = "/img/streamer3.jpg"
        break;
      case 3:
        streamerImageURL = "/img/streamer2.jpg"
        break;
      case 4:
        streamerImageURL = "/img/streamer5.jpg"
        break;
      default:
    }

    return (
      <Window level={this.props.level} windowClass={classes} windowTitle="Lovestreamer" windowClose={this.attemptToClose}>
        <div className="livestream__video">
          <img className="livestream__video-image" src={streamerImageURL} alt="Online content streamer"/>
          <div className="livestream__view-count">{this.state.viewers + " watchers"}</div>
          <div className="livestream__live-status">LIVE</div>
          <div className="livestream__heart-count">{this.state.hearts} <BsHeartFill className="livestream__heart-icon"/></div>
        </div>
        <div className="livestream__chat-feed">
          {chatMessages}
          <div ref={(div) => { this.endOfMessages = div; }}></div>
        </div>
        <div className="livestream__chat-options">
          <div className="livestream__chat-button" onClick={this.postHeartMessage}>💖</div>
          <div className="livestream__chat-button" onClick={this.postHeartMessage}>😍</div>
          <div className="livestream__chat-button" onClick={this.postHeartMessage}>💟</div>
          <div className="livestream__chat-button" onClick={this.postHeartMessage}>💘</div>
          <div className="livestream__chat-button" onClick={this.postHeartMessage}>💗</div>
        </div>
      </Window>
    );
  }
  
}
  
export default Livestream;