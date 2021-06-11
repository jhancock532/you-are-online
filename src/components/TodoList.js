import React from 'react';
import Window from './Window';

const TODO_MESSAGES = [
  "Contemplate life.",
  "Find inner peace.",
  "Practice stillness.",
  "Look at the screen.",
  "Take a deep breath.",
  "Feel your emotions.",
  "Take time for rest.",
  "Go outside."
];

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
    };

    this.toggleListItem = this.toggleListItem.bind(this);
    this.checkIfAllItemsTicked = this.checkIfAllItemsTicked.bind(this);
    this.attemptToClose = this.attemptToClose.bind(this);
  }

  createNewListItems() {
    this.setState({ listItems: [] });
    let newListItems = [];
    const todoListLength = 5 + Math.floor(Math.random() * 3); 

    for (let i = 0; i < todoListLength; i++) {
      if (Math.random() < 0.1){
        const randomToDoMessage = TODO_MESSAGES[Math.floor(Math.random() * TODO_MESSAGES.length)]
        newListItems.push({ message: randomToDoMessage, checked: false});
      } else {
        newListItems.push({ message: "Tick this!", checked: false});
      }
    }

    this.setState({
      listItems: newListItems
    });
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
        this.props.addExperience(1, effectSpawnPosition);
      } else {
        this.props.addExperience(-1, effectSpawnPosition);
      }
    }
  
  }

  attemptToClose() {

    this.props.callAlert({
      title: "We're not done yet.",
      message: "Tick the empty boxes, don't click the red cross!",
      dismissal: "Tick this!",
    });

    //You work for me now.
    //You only exist if you `do`;
    //Without action or attention,
    //You are worthless in the eyes of the algorithm.
    //I define what gives your worth.
    //I discern if you have value.
    //Whatever earns me more money, I will press you towards.

    //DO MORE.

    //Still Standing Still - Mixed Blood Majority

  }


  render() {

    const listItems = this.state.listItems.map((item, index) => 
      <ListItem 
        key={index}
        index={index}
        message={item.message}
        isChecked={item.checked}
        onToggle={this.toggleListItem}
      />
    );

    return (
      <Window windowClass="todo-list" windowTitle="Todo List" exitButton={true} windowClose={this.attemptToClose}>
        <div className="todo-list__container">
          {listItems}
          <p className="todo-list__encouragement">{this.state.encouragementMessage}</p>
        </div>
      </Window>
    );
  }
}

export default TodoList;