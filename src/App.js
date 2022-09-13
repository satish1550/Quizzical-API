import React from "react"
import Main from "./components/Main"
import Quiz from "./components/Quiz"
import Loader from './components/Loader'
import axios from "axios"
import "./App.css"

export default function App(){

    const [newPage, setNewPage] = React.useState(true)
    const [question, setQuestion] = React.useState([])
    const [showAnswer, setShowAnswer] = React.useState(false)
    const [score, setScore] = React.useState(0)
    const [loading, setLoading] = React.useState(true)

    // console.log(question)

    function Render(){
        return(
            setNewPage(prevPage => !prevPage),
            setLoading(true)
        )
    }

    function palyAgain(){
        return(
            setNewPage(prevData => !prevData),
            setShowAnswer(prevData => !prevData)
        )
    }

    function checkAnswer(){
        return(
            setShowAnswer(prevData => !prevData)
        )
    }

    React.useEffect(() => {
        if(newPage === false){
            axios.get("https://opentdb.com/api.php?amount=5&type=multiple")
            // .then(res => res.json())
            .then(res => setQuestion(res.data.results.map((question) => {
                // const correct_answer = question.correct_answer
                // const incorrect_answers = question.incorrect_answers

                setLoading(prevState => !prevState)

                return({
                    question:question.question,
                    options:question.incorrect_answers.concat([question.correct_answer]).map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value),
                    correct_answer:question.correct_answer
                })
            })))
        }
    }, [newPage])

    React.useEffect(() => {
        let count = 0;
        for(let i = 0; i<question.length; i++){
            if (question[i].selected_answer !== "undefined"){
                if(question[i].options[question[i].selected_answer] === question[i].correct_answer){
                    count++
                }
            }
        }
        setScore(count)
    }, [question])

    function selectedAnswer(event,question_id,option_id){
        setQuestion(prevData => {
            return(
                question.map((question,id) => {
                    return(
                        question_id === id ? {...question,selected_answer:option_id} : question
                    )
                })
            )
        })
    }

    const Questions = question.map((question,index) => {
        return(
            <Quiz 
                key = {index}
                question = {question}
                id = {index}
                showAnswer = {showAnswer}
                selectedAnswer = {selectedAnswer}
            />
        )
    })

    return(
        <div className="App">
            {newPage ? <Main Render = {Render} /> :
                loading ? <Loader /> :
                    <div>
                    {Questions}
                    {showAnswer ?
                        <div className="footer">
                            <h3 className="score">{"You scored "+ score +"/5 correct answers"}</h3>
                            <button className="playAgain" onClick={palyAgain}>play Again</button>
                        </div> :
                        <button className="checkAnswer" onClick={checkAnswer}>check Answers</button>
                    }
                </div>
            }
        </div>
    )
}