import React from "react";
import "../assets/css/navbar.css";

function TopBar(props) {
    return (
        <nav className="navbar">
            <a className="nav-item" href="/">Clicker Game</a>
            <span className="nav-item">
                {props.message}
            </span>
            <span className="nav-item">
                {"Score: "}{props.score}{" | Top Score: "}{props.highScore}
            </span>
        </nav>
    )
}

export default TopBar;