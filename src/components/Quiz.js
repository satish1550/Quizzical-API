import React from "react";

export default function Quiz(props){

    // function styles((option, index)=>{
    //     props.showAnswer ? 
    //         props.question.correct_answer === option ?
    //             {backgroundColor: "#94D7A2"} 
    //         :
    //         props.question.selectedAnswer === index ?
    //                 {backgroundColor: "#F8BCBC"} : {backgroundColor: "#F5F7FB"} 
    //             :
    //             props.question.selectedAnswer === index ? {backgroundColor: "#D6DBF5"} : {backgroundColor: "#F5F7FB"}
    // })

    function styles(option,index){
        if (props.showAnswer === true){
            if(props.question.correct_answer === option){
                return({backgroundColor: "#94D7A2"})
            }
            else if(props.question.selected_answer === index){
                return({backgroundColor: "#F8BCBC"})
            }
            else{
                return({backgroundColor: "#F5F7FB"})
            }
        }else{
            return(props.question.selected_answer === index ? {backgroundColor: "#D6DBF5"} : {backgroundColor: "#F5F7FB"})
        }
    }

    const options = props.question.options.map((option, index) => 
        <div
            className="options"
            key = {index}
            dangerouslySetInnerHTML={{__html: option}}
            onClick={(event) => props.selectedAnswer(event,props.id,index)}
            style={styles(option,index)}
        />
    )

    return(
        <div className="container-box">
            <div className="questions" onClick={props.Loading} dangerouslySetInnerHTML={{__html: props.question.question}} />
            <span className="container">{options}</span>
            <hr className="line"/>
        </div>
    )
}