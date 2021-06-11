/* SOCIAL.JS */
//This part caused me a lot of trouble with resetting CSS animations to play again.
//The solution was an if statement that added / removed the CSS class depending on state

  /*
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

    //Another early attempt at the CSS Spin animation...
    //Get all the elements with social__notification__bubble__lottery-number class
    //apply the spin animation class to trigger the animation once, 
    //then after it finishes, remove it with a setTimeout
    //This is a horrible solution, I should probably use GSAP or something?
    //social__notification__bubble__lottery-spin

    
    const lotteryNumbers = document.getElementsByClassName("social__notification__bubble__lottery-number");
    for (let i = 0; i < lotteryNumbers; i++){
      lotteryNumbers[i].classList.add("social__notification__bubble__lottery-spin");

      setTimeout(() => { 
        lotteryNumbers[i].classList.remove("social__notification__bubble__lottery-spin");
      }, 3000);
    }
  }

  }
  */

  /*
  //An early attempt at resetting the CSS lottery spin animation...
  onAnimationEnd(){
    const lotteryNumbers = document.getElementsByClassName("social__notification__bubble__lottery-number");
    
    console.log(lotteryNumbers);
    for (let i = 0; i < lotteryNumbers; i++){
      lotteryNumbers[i].classList.remove("social__notification__bubble__lottery-spin");
    }

  }*/