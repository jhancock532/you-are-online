import React from 'react';
import Window from './Window';
import { BsBellFill, BsFillEnvelopeFill, BsHeartFill, BsPeopleFill } from 'react-icons/bs';
import { IoReloadSharp } from 'react-icons/io5';

const POSTS = [
  "Hello world! #myfirstcontent 🥰", //silcon valley poison seeps gently into our introductions 
  "I'm so many moves ahead of you I've wandered off to the pub and I've ordered a pint :)",
  "Hurting others is bad, and if that offends you I don't care 😒",
  "Stevie Wonderwall is the quality content of my hearts deepest desire.",
  "Young content producers operate on a whole new level of tiredness; crypt-status.",
  "Behold! The democracy of numbers on a screen, as alotted by the general populus.",
];

class Social extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      post: "",
      postFinished: false,
      refreshReady: false,
      postsSubmitted: 0,
      postCharacterIndex: 0,
      postNumber: 0,
      showHint: true,
      notifications: {
        general: 0,
        messages: 0,
        hearts: 0,
        followers: 0
      }
    }

    this.attemptToClose = this.attemptToClose.bind(this);
    this.textInput = this.textInput.bind(this);
    this.submitPost = this.submitPost.bind(this);
    this.handleSubmitButton = this.handleSubmitButton.bind(this);
    this.handleRefreshButton = this.handleRefreshButton.bind(this);
    this.getLotteryNumbers = this.getLotteryNumbers.bind(this);
  }

  attemptToClose(){

    this.props.callAlert({
      title: "Wait!",
      message: "What if someone needs you?",
      dismissal: "I'll stay online",
    });

  }

  handleSubmitButton(){

    if (this.state.postFinished){
      this.submitPost();
    }

  }

  handleRefreshButton(){

    if (this.state.refreshReady && (this.state.postsSubmitted > 0)){

      const generalNotifications = Math.floor(Math.random() * 3 + Math.random() * 4 * this.state.postsSubmitted);
      const messageNotifications = Math.floor(Math.random() * 1 + Math.random() * 1 * this.state.postsSubmitted);
      const heartNotifications = Math.floor(Math.random() * 8 + Math.random() * 10 * this.state.postsSubmitted);
      const followerNotifications = Math.floor(Math.random() * 2 + Math.random() * 2 * this.state.postsSubmitted);

      this.setState(state => ({
        refreshReady: false,
        postsSubmitted: 0,
        notifications: {
          general: state.notifications.general + generalNotifications,
          messages: state.notifications.messages + messageNotifications,
          hearts: state.notifications.hearts + heartNotifications,
          followers: state.notifications.followers + followerNotifications
        }
      }));

    }

  }


  submitPost(){

    this.setState(state => ({
      refreshReady: true,
      showHint: true,
      postFinished: false,
      post: "",
      postNumber: (state.postNumber + 1) % POSTS.length,
      postsSubmitted: state.postsSubmitted + 1,
      postCharacterIndex: 0,
    }))

  }

  textInput = event => {
    event.preventDefault();

    if (this.state.showHint) {
      this.setState({
        showHint: false,
      })
    }

    if (this.state.postCharacterIndex < POSTS[this.state.postNumber].length){
      this.setState(state => ({
        post: state.post + POSTS[state.postNumber].substring(state.postCharacterIndex, state.postCharacterIndex + 1),
        postCharacterIndex: state.postCharacterIndex + 1,
      }))
    } 

    if (this.state.postCharacterIndex >= POSTS[this.state.postNumber].length - 1){
      this.setState({
        postFinished: true
      })
    }

    if (event.key === "Enter" && this.state.postFinished){
      const boundingRectangle = event.currentTarget.getBoundingClientRect();
      const effectSpawnPosition = {x: boundingRectangle.x + 4, y: boundingRectangle.y + 40}

      this.props.addExperience(1, effectSpawnPosition);
      this.submitPost();
    }

  }

  getLotteryNumbers(result){
    //It was rigged from the start!

    let lotteryNumbers = [result.toString()];

    for (let i = 0; i < 9; i++){
      let number = Math.floor(Math.random() * 10).toString();
      if (result > 9) number = number + Math.floor(1 + Math.random() * 9).toString();
      if (result > 99) number = number + Math.floor(1 + Math.random() * 9).toString();

      lotteryNumbers.push(number);
    }
    lotteryNumbers.push(result.toString());

    let classNames = "social__notification__bubble__lottery-number ";

    //Resets the CSS animation, spinning the numbers again.
    //See codegraveyard.js for other attempts
    if (!this.state.refreshReady) {
      classNames += "social__notification__bubble__lottery-spin";
    }

    const lotteryDivs = lotteryNumbers.map((number) => 
      <div className={classNames}>{number}</div>
    );

    return (
      <div className="social__notification__bubble__lottery">
        {lotteryDivs}
      </div>
    );
  }

  render() {

    const textboxDefaultMessage = this.state.showHint ? <p className="social__hint-text">Type here...</p> : <></>;

    const MessageNotification = this.state.notifications.messages > 0 ?
      <div className="social__notification__bubble">
        {this.state.notifications.messages}
        {this.getLotteryNumbers(this.state.notifications.messages)}
      </div> : <></>

    const GeneralNotification = this.state.notifications.general > 0 ?
      <div className="social__notification__bubble">
        {this.state.notifications.general}
        {this.getLotteryNumbers(this.state.notifications.general)}
      </div> : <></>

    const HeartNotification = this.state.notifications.hearts > 0 ?
      <div className="social__notification__bubble">
        {this.state.notifications.hearts}
        {this.getLotteryNumbers(this.state.notifications.hearts)}
      </div> : <></>

    const FollowerNotification = this.state.notifications.followers > 0 ?
      <div className="social__notification__bubble">
        {this.state.notifications.followers}
        {this.getLotteryNumbers(this.state.notifications.followers)}
      </div> : <></>

    return (
      <Window windowClass="social" windowTitle="Content Creator" exitButton={true} windowClose={this.attemptToClose}>
        {/*<p className="social__prompt">Produce your content...</p>*/}
        {textboxDefaultMessage}
        <textarea className="social__text-input" onKeyDown={this.textInput} defaultValue={this.state.post}></textarea>
        <div className="social__submit-button" onClick={this.handleSubmitButton}>
          Submit content!
          <span className="social__submit-button__tooltip">Press enter to submit faster!</span>
        </div>
        <div className="social__notifications">
          <div className="social__notification">
            <BsBellFill className="social__notification__icon"/>
            {GeneralNotification}
          </div>
          <div className="social__notification">
            <BsFillEnvelopeFill className="social__notification__icon"/>
            {MessageNotification}
          </div>
          <div className="social__notification">
            <BsHeartFill className="social__notification__icon"/>
            {HeartNotification}
          </div>
          <div className="social__notification">
            <BsPeopleFill className="social__notification__icon"/>
            {FollowerNotification}
          </div>
        </div>
        <div className="social__refresh" onClick={this.handleRefreshButton}>
          { this.state.refreshReady ? <><IoReloadSharp className="social__refresh__spinner"/>Refresh Notifications</> : <>Refresh Notifications</>}
        </div>
      </Window>
    );
  }

}

export default Social;