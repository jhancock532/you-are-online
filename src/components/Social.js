import React from 'react';
import Window from './Window';
import { BsBellFill, BsFillEnvelopeFill, BsHeartFill, BsPeopleFill } from 'react-icons/bs';
import { IoReloadSharp } from 'react-icons/io5';

const POSTS = [
  "Hello world! #myfirstcontent 🥰", //silcon valley floats gently into our introductions
  `Go online / Abandon thought
Lose yourself / In one and nought #poetry`,
  "When consuming content, we lose our sense of self and become a part of the internet machine.", 
  "The most important product tech companies develop is your attachment.",
  "The early web was made by its users, the modern web is passive.",
  "On Twitter, your life is reduced to series of tweets.",
  "I am a minecraft redstone computer. #ai #academics #conditioned",
  "Demands on your attention remove your ability to attend",
  "I'm so many moves ahead of you I've wandered off to the pub and I've ordered a pint :)",
  "Hurting others is bad, and if that offends you I don't care 😒",
  "Stevie Wonderwall is the quality content of my hearts deepest desire.",
  "#poetry #poetry #poetry #poetry #poetry #poetry ... sometimes it just hits different.",
  "Young content producers operate on a whole new level of tiredness; crypt-status.",
  "Behold! The democracy of numbers on a screen, as alotted by the general populus.",
  "Coded, conditioned, part of the algorithm. Where does the internet end and the user begin?",
  "The user only exists online. Their sole purpose, to unfold the designs we've created.",
  "The discomfort calls us closer, it echoes of past intimacy.",
  "The longer you stay the worse it gets.",
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
      notificationTab: null,
      notifications: {
        general: 0,
        messages: 0,
        hearts: 0,
        followers: 0
      },
      socialCapital: {
        influence: 0,
        demands: 0,
        adoration: 0,
        watchers: 0
      }
      
    }

    this.attemptToClose = this.attemptToClose.bind(this);
    this.textInput = this.textInput.bind(this);
    this.submitPost = this.submitPost.bind(this);
    this.handleSubmitButton = this.handleSubmitButton.bind(this);
    this.handleRefreshButton = this.handleRefreshButton.bind(this);
    this.getLotteryNumbers = this.getLotteryNumbers.bind(this);
    this.toggleFollowerNotifications = this.toggleFollowerNotifications.bind(this);
    this.toggleGeneralNotifications = this.toggleGeneralNotifications.bind(this);
    this.toggleMessageNotifications = this.toggleMessageNotifications.bind(this);
    this.toggleHeartNotifications = this.toggleHeartNotifications.bind(this);
  }

  attemptToClose(){

    this.props.callAlert({
      title: "Wait!",
      message: "What if someone needs you?",
      dismissal: "I'll stay online",
    });

  }

  handleSubmitButton(event){

    if (this.state.postFinished){
      const boundingRectangle = event.currentTarget.getBoundingClientRect();
      const xOffset = -80 + Math.random() * 160;
      const effectSpawnPosition = {x: boundingRectangle.x + xOffset, y: boundingRectangle.y - 30}

      this.props.addExperience(1, effectSpawnPosition);
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
        notificationTab: null,
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
      const xOffset = Math.random() * 160;
      const effectSpawnPosition = {x: boundingRectangle.x + xOffset, y: boundingRectangle.y + 40}

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

  toggleGeneralNotifications(event) {

    if (this.state.notifications.general > 0){
      const boundingRectangle = event.currentTarget.getBoundingClientRect();
      const xOffset = -20 + Math.random() * 40;
      const effectSpawnPosition = {x: boundingRectangle.x + xOffset, y: boundingRectangle.y - 20}
      this.props.addExperience(this.state.notifications.general, effectSpawnPosition);
    }

    if (this.state.notificationTab !== "general"){
      this.setState(state => ({
        socialCapital: {
          influence: state.socialCapital.influence + state.notifications.general,
          demands: state.socialCapital.demands,
          adoration: state.socialCapital.adoration,
          watchers: state.socialCapital.watchers
        },
        notifications: {
          general: 0,
          messages: state.notifications.messages,
          followers: state.notifications.followers,
          hearts: state.notifications.hearts,
        },
        notificationTab: "general"
      }))
    } else {
      this.setState({
        notificationTab: "null"
      })
    }

  }

  toggleMessageNotifications(event) {

    if (this.state.notifications.messages > 0){
      const boundingRectangle = event.currentTarget.getBoundingClientRect();
      const xOffset = -20 + Math.random() * 40;
      const effectSpawnPosition = {x: boundingRectangle.x + xOffset, y: boundingRectangle.y - 20}
      this.props.addExperience(this.state.notifications.messages * 2, effectSpawnPosition);
    }

    if (this.state.notificationTab !== "messages"){
      this.setState(state => ({
        socialCapital: {
          influence: state.socialCapital.influence,
          demands: state.socialCapital.demands + state.notifications.messages,
          adoration: state.socialCapital.adoration,
          watchers: state.socialCapital.watchers
        },
        notifications: {
          general: state.notifications.general,
          messages: 0,
          followers: state.notifications.followers,
          hearts: state.notifications.hearts,
        },
        notificationTab: "messages"
      }))
    } else {
      this.setState({
        notificationTab: "null"
      })
    }

  }

  toggleHeartNotifications(event) {

    if (this.state.notifications.hearts > 0){
      const boundingRectangle = event.currentTarget.getBoundingClientRect();
      const xOffset = -20 + Math.random() * 40;
      const effectSpawnPosition = {x: boundingRectangle.x + xOffset, y: boundingRectangle.y - 20}
      this.props.addExperience(this.state.notifications.hearts, effectSpawnPosition);
    }

    if (this.state.notificationTab !== "hearts"){
      this.setState(state => ({
        socialCapital: {
          influence: state.socialCapital.influence,
          demands: state.socialCapital.demands,
          adoration: state.socialCapital.adoration + state.notifications.hearts,
          watchers: state.socialCapital.watchers
        },
        notifications: {
          general: state.notifications.general,
          messages: state.notifications.messages,
          followers: state.notifications.followers,
          hearts: 0,
        },
        notificationTab: "hearts"
      }))
    } else {
      this.setState({
        notificationTab: "null"
      })
    }

  }

  toggleFollowerNotifications(event) {

    if (this.state.notifications.followers > 0){
      const boundingRectangle = event.currentTarget.getBoundingClientRect();
      const xOffset = -20 + Math.random() * 40;
      const effectSpawnPosition = {x: boundingRectangle.x + xOffset, y: boundingRectangle.y - 20}
      this.props.addExperience(this.state.notifications.followers, effectSpawnPosition);
    }


    if (this.state.notificationTab !== "followers"){
      this.setState(state => ({
        socialCapital: {
          influence: state.socialCapital.influence,
          demands: state.socialCapital.demands,
          adoration: state.socialCapital.adoration,
          watchers: state.socialCapital.watchers + state.notifications.followers
        },
        notifications: {
          general: state.notifications.general,
          messages: state.notifications.messages,
          followers: 0,
          hearts: state.notifications.hearts,
        },
        notificationTab: "followers"
      }))
    } else {
      this.setState({
        notificationTab: "null"
      })
    }

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

      let notificationTab;

      switch (this.state.notificationTab) {
        case "general":
          notificationTab = <div className="social__infromation-tab">
            <p>You have {this.state.socialCapital.influence} influence.</p>
          </div>
          break;
        case "messages":
          notificationTab = <div className="social__infromation-tab">
            <p>{this.state.socialCapital.demands} accounts want your personal, private attention.</p>
          </div>
          break;
        case "hearts":
          notificationTab = <div className="social__infromation-tab">
            <p>You are worth {this.state.socialCapital.adoration} hearts.</p>
          </div>
          break;
        case "followers":
          notificationTab = <div className="social__infromation-tab">
            <p>{this.state.socialCapital.watchers} observers are watching you.</p>
          </div>
          break;
        default:
          notificationTab = <></>;
      }

    let classes = "social ";

    switch (this.props.level) {
      case 1:
        classes += "social--light ";
        break;
      case 2:
        classes += "social--dark ";
        break;
      case 3:
        classes += "social--glitch ";
        break;
      default:
    }

    return (
      <Window level={this.props.level} windowClass={classes} windowTitle="Content Creator" windowClose={this.attemptToClose}>
        {/*<p className="social__prompt">Produce your content...</p>*/}
        {textboxDefaultMessage}
        <textarea className="social__text-input" onKeyDown={this.textInput} defaultValue={this.state.post}></textarea>
        <div className="social__submit-button" onClick={this.handleSubmitButton}>
          Submit content!
          <span className="social__submit-button__tooltip">Press enter to submit faster!</span>
        </div>
        <div className="social__notifications">
          <div className="social__notification" onClick={this.toggleGeneralNotifications}>
            <BsBellFill className={"social__notification__icon " + ((this.state.notificationTab === "general") ? "social__notification__icon--selected" : "")}/>
            {GeneralNotification}
          </div>
          <div className="social__notification" onClick={this.toggleMessageNotifications}>
            <BsFillEnvelopeFill className={"social__notification__icon " + ((this.state.notificationTab === "messages") ? "social__notification__icon--selected" : "")}/>
            {MessageNotification}
          </div>
          <div className="social__notification" onClick={this.toggleHeartNotifications}>
            <BsHeartFill className={"social__notification__icon " + ((this.state.notificationTab === "hearts") ? "social__notification__icon--selected" : "")}/>
            {HeartNotification}
          </div>
          <div className="social__notification" onClick={this.toggleFollowerNotifications}>
            <BsPeopleFill className={"social__notification__icon " + ((this.state.notificationTab === "followers") ? "social__notification__icon--selected" : "")}/>
            {FollowerNotification}
          </div>
        </div>
        <div className="social__refresh" onClick={this.handleRefreshButton}>
          { this.state.refreshReady ? <><IoReloadSharp className="social__refresh__spinner"/>Refresh Notifications</> : <>Refresh Notifications</>}
        </div>
        {notificationTab}
      </Window>
    );
  }

}

export default Social;