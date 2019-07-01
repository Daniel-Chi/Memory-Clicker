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
    images: []
  };

  //initialize images in array as objects with url and boolean for whether clicked
  componentDidMount() {
    this.setState({
      images: imageUrlArray.map(item => {
        return {
          url: item,
          clicked: false
        }
      })
    });
    this.setState(prevState => {
      return { images: this.shuffleArray(prevState.images) }
    });
  };

  //function to shuffle images in array (mutates array)
  shuffleArray = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      //choose a random place to swap each item
      const randomIndex = Math.floor(Math.random() * arr.length);
      //swap each item with another random item (or itself)
      [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]]
    };
    return arr;
  }

  //function to increase score
  handleIncreaseScore = () => {
    //functional setState preserves sequence of events to prevent errors caused
    //by attempting to increase score before previous setState is completed
    this.setState(prevState => {
      //compare new score with high score
      if (prevState.score + 1 > prevState.highScore) {
        //also check for complete victory
        if (prevState.score + 1 === prevState.images.length) {
          alert("Wow! Perfect!");
          this.handleChangeMessage("Click a Kirby to play again!");
          return {
            //reset score
            score: 0,
            //reset clicked values to false
            images: this.resetClickedToFalse(prevState.images)
          }
          //regular score increase if not complete victory yet
        } else {
          return {
            score: (prevState.score + 1),
            highScore: (prevState.score + 1)
          };
        }
      } else {
        //don't change high score if new score isn't greater
        return {
          score: (prevState.score + 1)
        };
      }
    });
    this.setState(prevState => {
      return { images: this.shuffleArray(prevState.images) }
    });
  }

  //function to change message and rerender affected elements
  handleChangeMessage = (newMessage) => {
    this.setState({ message: newMessage });
  }

  //function to reset game on win or loss
  handleResetGame = () => {
    this.handleChangeMessage("Click a Kirby to start again!");
    this.setState(prevState => {
      return {
        score: 0,
        //reset all click values to false
        images: this.resetClickedToFalse(prevState.images)
      }
    });
    //shuffle all images
    this.setState(prevState => {
      return { images: this.shuffleArray(prevState.images) }
    });
  }

  //function to return array with reset clicked property of objects
  resetClickedToFalse = (arr) => {
    return arr.map(
      item => {
        let resetItem = Object.assign({}, item);
        resetItem.clicked = false;
        return resetItem;
      }
    )
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
            this.state.images.map((item) => (
              <Tile
                key={item.url}
                url={item.url}
                handleChangeMessage={this.handleChangeMessage}
                handleIncreaseScore={this.handleIncreaseScore}
                handleResetGame={this.handleResetGame}
                shuffleArray={this.shuffleArray}
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
