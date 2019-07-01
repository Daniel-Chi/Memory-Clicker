import React from 'react';
import TopBar from "./components/TopBar";
import GameContainer from "./components/GameContainer";
import Header from "./components/Header";
import Tile from "./components/Tile";
import imageUrlArray from "./assets/images/imageUrls";
// TODO import local images packaged by webpack instead of using external urls
// const images = require.context("../public/assets/images", false, /\.jpg$/)

//structure App with jsx
class App extends React.Component {

  //score is tracked in App's state because it is common to Header and GameContainer
  state = {
    score: 0,
    highScore: 0,
    message: "Click a Kirby to begin!",
    imageUrls: []
  };

  //initialize imageUrls array on mount
  componentDidMount() {
    this.randomizeImageOrder();
  };

  //function to shuffle images in array
  randomizeImageOrder = () => {
    let randomArray = [];
    //loop through and randomly insert 12 image urls
    for (let i = 0; i < 12; i++) {
      //choose a random place to insert each image url
      const randomIndex = Math.floor(Math.random() * randomArray.length);
      //insert URL into the array
      randomArray.splice(randomIndex, 0, imageUrlArray[i]);
    };
    this.setState({ imageUrls: randomArray });
  }

  //function to increase score
  handleIncreaseScore = () => {
    //functional setState preserves sequence of events to prevent errors caused
    //by attempting to increase score before previous setState is completed
    this.setState(prevState => {
      //compare new score with high score
      if (prevState.score + 1 > this.state.highScore) {
        return {
          score: (prevState.score + 1),
          highScore: (prevState.score + 1)
        };
      } else {
        //don't change high score if new score isn't greater
        return {
          score: (prevState.score + 1)
        };
      }
    });
  }

  //function to change message and rerender affected elements
  handleChangeMessage = (newMessage) => {
    this.setState({ message: newMessage });
  }

  //function to reset game on win or loss
  handleResetGame = () => {
    this.handleChangeMessage("Click a Kirby to start again!");
    this.setState({ score: 0 });
  }

  //render all components wrapped in a single div
  render() {
    //pass score and score handler to components that need it
    return (
      <div>
        <TopBar 
        score={this.state.score} 
        highScore={this.state.highScore}
        message={this.state.message}
        />
        <Header />
        <br></br>
        <br></br>
        <GameContainer>
          {//render all image tiles by mapping through Urls array in state
            //pass into GameContainer component as children
            this.state.imageUrls.map((item) => (
              <Tile
                key={item}
                url={item}
                handleChangeMessage={this.handleChangeMessage}
                handleIncreaseScore={this.handleIncreaseScore}
                handleResetGame={this.handleResetGame}
                randomizeImageOrder={this.randomizeImageOrder}
              />
            ))}
        </GameContainer>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    );
  }
}

export default App;
