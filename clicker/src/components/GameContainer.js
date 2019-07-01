import React from "react";

function GameContainer (props) {
        return (
            <main className="container">
                <div className="row">
                    {props.children}
                </div>
            </main>
        )
}

export default GameContainer;