import React from 'react';
import TopBar from "./components/TopBar";
import Game from "./components/Game";
import Header from "./components/Header";

//structure App with jsx
class App extends React.Component {

  //score is tracked in App's state because it is common to Header and Game
  state = {
    score: 0,
    highScore: 0,
    message: "Click a Kirby to begin!"
  };

  //function to increase score
  handleIncreaseScore = () => {
    //functional setState preserves sequence of events to prevent errors caused
    //by attempting to increase score before previous setState is completed
    this.setState(prevState => {
      //compare new score with high score
      if (prevState.score + 1 > this.highScore){
        return { 
          score: (prevState.score + 1),
          highScore: (prevState.score + 1)
        }
      } else {
        //don't change high score if new score isn't greater
        return {
          score: (prevState.score + 1)
        }
      }
    })
  }

  //function to change message and rerender affected elements
  handleChangeMessage = (newMessage) => {
    this.setState({ message: newMessage })
  }

  //render all components wrapped in a single div
  render() {
    //pass score and score handler to components that need it
    return (
      <div>
        <TopBar score={this.score} highScore={this.highScore}>
          {this.message}
        </TopBar>
        <Header />
        <Game
          score={this.score}
          handleIncreaseScore={this.handleIncreaseScore}
        />
      </div>
    );
  }
}

export default App;
