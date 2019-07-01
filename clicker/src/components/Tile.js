import React from "react";
import "../assets/css/kirby-image.css"

class Tile extends React.Component {

    //store whether or not the image has already been clicked
    state = {
        clicked: false
    }

    handleGuessOnClick(e) {
        e.preventDefault()
        //if guess is correct, i.e. not clicked
        if (!this) {
            this.handleCorrectGuess();
            //if guess is incorrect, already clicked
        } else {
            this.handleIncorrectGuess();
        }
    }

    handleCorrectGuess() {
        this.props.handleChangeMessage("Great!")
            .then(this.props.handleIncreaseScore())
            .then(this.setState({ clicked: true }))
    }

    handleIncorrectGuess() {
        this.props.handleChangeMessage("Game Over!")
            .then(this.props.handleResetGame())
    }

    render() {
        return (
            <div className="col-lg-3 col-md-4">
                <a href="/" onClick={this.handleGuessOnClick}>
                    <img
                        alt="Kirby"
                        src={this.props.url}
                        className="kirby-image"
                    />
                </a>
            </div>
        )
    }
}

export default Tile;