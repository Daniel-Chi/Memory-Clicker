import React from "react";
import "../assets/css/kirby-image.css"

function Tile (props) {

    //function that handles correct guess
    const handleCorrectGuess = () => {
        props.handleChangeMessage("Great!");
        props.handleIncreaseScore();
        props.setClickedByUrl(props.url);
    }

    //function that handles incorrect guess
    const handleIncorrectGuess = () => {
        alert("Game Over!")
        props.handleResetGame();
    }

        //check for incorrect answer, already clicked
        if (props.clicked) {
            return (
                <div className="col-lg-3 col-md-4">
                        <img
                            src={props.url}
                            alt="Kirby"
                            className="kirby-image"
                            onClick={handleIncorrectGuess}
                        />
                </div>
            )
        //check for correct answer, not yet clicked
        } else {
            return (
                <div className="col-lg-3 col-md-4">
                        <img
                            src={props.url}
                            alt="Kirby"
                            className="kirby-image"
                            onClick={handleCorrectGuess}
                        />
                </div>
            )
        }
}

export default Tile;