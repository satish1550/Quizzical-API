import React from "react";

export default function Main(props){

    return(
        <div className="Main">
            <h1>Quizzical</h1>
            <p>Text your GK</p>
            <div onClick={props.Render}>
                <button className="start-btn"><b>Start quiz</b></button> 
            </div>
        </div>
    )
}
