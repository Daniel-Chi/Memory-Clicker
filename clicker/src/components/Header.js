import React from "react";
import "../assets/css/game-intro.css"

function Header() {
    return (
        <header className="jumbotron jumbotron-fluid game-intro">
            <div className="container">
                <h1 className="display-4">Kirby Memory Clicker Game!</h1>
                <p className="lead">Click a Kirby to earn a point, but if you click one twice it's Game Over!</p>
            </div>
        </header>
    )
}

export default Header;