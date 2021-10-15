import React from 'react';
import Window from './Window';

const TODO_MESSAGES = [
  "Contemplate life.",
  "Find inner peace.",
  "Practice stillness.",
  "Take a deep breath.",
  "Feel my emotions.",
  "Take time for rest.",
  "Go outside.",
  "Practice compassion.",
  "Plan for the future.",
  "Be kind to myself.",
  "Accept reality, openly.",
];

const MUST_DO_MESSAGES = [
  "Get a degree",
  "Find life purpose",
  "Find the dream job",
  "Get a raise",
  "Have sex",
  "Write a book",
  "Build online presence",
  "Learn to draw",
  "Find a partner",
  "Improve my diet",
  "Cook a fancy meal",
  "Go vegan",
  "Practice my singing",
  "Play an instrument",
  "Write thoughtful poetry",
  "Learn to paint",
  "Make meaningful friendships",
  "Fight for peace",
  "Save the environment",
  "Be better",
  "Be better",
  "Be better",
  "Be better",
  "Be better",
  "Be better",
  "Be better",
]

const COMMANDS = [
  "Live a meaningful life!",
  "Stop wasting time online!",
  "Break the cycle!",
  "Look at the screen!",
  "Ignore the tension!",
  "Drown the discomfort!",
  "Sell the dreams of society!",
  "FIND LOVE.",
  "FORGIVE MYSELF.",
  "LET GO.",
  "BE FREE.",
  "STOP.",
  "STOP.",
  "STOP.",
  "STOP.",
  "STOP.",
  "STOP.",
  "STOP.",
]

const ENCOURAGEMENT_MESSAGES = [
  "Be productive! 🤑",
  "#Motivated! 😎",
  "Life goooooals! 🤪",
  "You're doing great! 😜",
  "Click those boxes! 🐱‍💻"
]

const ITEMS_TO_CLICK = 8;

const ListItem = props => (
  <label className="todo-list__label">
    <input index={props.index}
      type="checkbox" 
      checked={props.isChecked} 
      onChange={props.onToggle}
      onKeyUp={props.onToggle}
    />
    <span className={ props.isChecked ? "todo-list__struck" : "todo-list__not-struck" }>{props.message}</span>
  </label>
)

class TodoList extends React.Component {

  constructor(props) {
    super(props);

    let newListItems = [];
    for (let i = 0; i < 5; i++) {
      newListItems.push({ message: "Tick this!", checked: false});
    }

    this.state = { 
      listItems: newListItems,
      encouragementMessage: "Complete the todo list! 🥰",
      clickedItems: 0,
      level: 0,
      messageNumber: 0,
    };

    this.toggleListItem = this.toggleListItem.bind(this);
    this.checkIfAllItemsTicked = this.checkIfAllItemsTicked.bind(this);
    this.attemptToClose = this.attemptToClose.bind(this);
  }

  componentDidUpdate(prevProps) {

    //https://www.pluralsight.com/guides/prop-changes-in-react-component
    if (prevProps.level !== this.props.level) {
      this.createNewListItems();
    }
  
  }

  createNewListItems() {
    this.setState({ listItems: [] });
    let newListItems = [];
    const todoListLength = 5 + Math.floor(Math.random() * 3); 
    const replacedItemIndex = Math.floor(Math.random() * todoListLength);

    for (let i = 0; i < todoListLength; i++) {

      if (i === replacedItemIndex) {
        let customToDoMessage;
        switch(this.props.level) {
          case 1:
            customToDoMessage = TODO_MESSAGES[this.state.messageNumber % TODO_MESSAGES.length];
            break;
          case 2:
            customToDoMessage = MUST_DO_MESSAGES[this.state.messageNumber % MUST_DO_MESSAGES.length];
            break;
          case 3:
            customToDoMessage = COMMANDS[this.state.messageNumber % COMMANDS.length];
            break;
          default:
        } 
        newListItems.push({ message: customToDoMessage, checked: false});
      } else {
        switch(this.props.level) {
          case 1:
            newListItems.push({ message: "Tick this!", checked: false});
            break;
          case 2:
            newListItems.push({ message: "Do this!", checked: false});
            break;
          case 3:
            newListItems.push({ message: "Don't stop!", checked: false});
            break;
          default:
        }
      }
    }

    this.setState(state => ({
      messageNumber: state.messageNumber += 1,
      listItems: newListItems
    }));
  }

  checkIfAllItemsTicked() {
    for (let i = 0; i < this.state.listItems.length; i++) {
      if ( this.state.listItems[i].checked === false) {
        return false;
      }
    }

    this.setState(state => ({
      clickedItems: state.clickedItems + state.listItems.length
    }));

    if (this.state.clickedItems > ITEMS_TO_CLICK) {
      this.setState(state => ({
        level: state.level + 1,
        clickedItems: 0
      }));
      this.levelUp();
    }

    return true;
  }

  levelUp() {
    const newMessage = ENCOURAGEMENT_MESSAGES[this.state.level % ENCOURAGEMENT_MESSAGES.length];

    this.setState({
      encouragementMessage: newMessage
    })
  }

  toggleListItem = event => {

    const listItemIndex = parseInt(event.currentTarget.getAttribute("index"));
    const newListItems = this.state.listItems;
    newListItems[listItemIndex].checked = !newListItems[listItemIndex].checked;

    const boundingRectangle = event.currentTarget.getBoundingClientRect();
    const effectSpawnPosition = {x: boundingRectangle.x - 60, y: boundingRectangle.y}

    this.setState({
      listItems: newListItems
    })

    if (this.checkIfAllItemsTicked()) {
      this.props.addExperience(this.state.listItems.length, effectSpawnPosition);
      this.createNewListItems();
    } else {
      if (newListItems[listItemIndex].checked){
        this.props.addExperience(this.props.level, effectSpawnPosition);
      } else {
        this.props.addExperience(-this.props.level, effectSpawnPosition);
      }
    }
  
  }

  attemptToClose() {

    this.props.callAlert({
      title: "We're not done yet.",
      message: "Tick the empty boxes, don't click the red cross!",
      dismissal: "Tick this!",
    });

  }

  render() {

    let classes = "todo-list ";

    switch (this.props.level) {
      case 1:
        classes += "todo-list--light ";
        break;
      case 2:
        classes += "todo-list--dark ";
        break;
      case 3:
        classes += "todo-list--glitch ";
        break;
      default:
    }

    const listItems = this.state.listItems.map((item, index) => 
      <ListItem 
        key={index}
        index={index}
        message={item.message}
        isChecked={item.checked}
        onToggle={this.toggleListItem}
      />
    );

    let windowTitle = "Todo List";
    if (this.props.level === 2) windowTitle = "Must Do List";
    if (this.props.level === 3) windowTitle = "Command-List.exe";

    return (
      <Window level={this.props.level} windowClass={classes} windowTitle={windowTitle} exitButton={true} windowClose={this.attemptToClose}>
        <div className="todo-list__container">
          {listItems}
          <p className="todo-list__encouragement">{this.state.encouragementMessage}</p>
        </div>
      </Window>
    );
  }
}

export default TodoList;