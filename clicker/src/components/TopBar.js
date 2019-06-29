import React from "react";

function TopBar(props) {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <a className="navbar-brand" href="/">Clicker Game</a>
                </li>
                <li>
                    {props.children}
                </li>
                <li>
                    {"Score: "}{props.score}{" | Top Score: "}{props.highScore}
                </li>
            </ul>
        </nav>
    )
}

export default TopBar;