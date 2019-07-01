import React from "react";
import "../assets/css/kirby-image.css"

class Tile extends React.Component {

    //store whether or not the image has already been clicked
    state = {
        clicked: false
    }

    //function that handles correct guess
    handleCorrectGuess = () => {
        this.setState({ clicked: true });
        this.props.handleChangeMessage("Great!");
        this.props.handleIncreaseScore();
    }

    //function that handles incorrect guess
    handleIncorrectGuess = () => {
        alert("Game Over!");
        this.props.handleResetGame();
    }

    render() {
        //check for incorrect answer, already clicked
        if (this.state.clicked) {
            return (
                <div className="col-lg-3 col-md-4">
                        <img
                            src={this.props.url}
                            alt="Kirby"
                            className="kirby-image"
                            onClick={this.handleIncorrectGuess}
                        />
                </div>
            )
        //check for correct answer, not yet clicked
        } else {
            return (
                <div className="col-lg-3 col-md-4">
                        <img
                            src={this.props.url}
                            alt="Kirby"
                            className="kirby-image"
                            onClick={this.handleCorrectGuess}
                        />
                </div>
            )
        }
    }
}

export default Tile;