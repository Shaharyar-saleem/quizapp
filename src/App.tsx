import React, {useEffect, useState} from 'react';
import {getQuizQuestion} from './Services/quiz';
import {QuizType} from './Types/quiz_types';
import QuestionCards from './Components/QuestionCards';


function App() {
  const [quiz, setQuiz]= useState<QuizType[]>([])
  let [currentQuestion, setCurrentQuestion]= useState(0)
  let [score, setScore]=useState(0);
  const [result, setResult]= useState(false);
  let [percent, setPercent]= useState(0);

  
  useEffect(()=>{
    async function getQuestions(){
      const questions: QuizType[] = await getQuizQuestion(5, 'easy')
      setQuiz(questions)
    }
    getQuestions()
  },[])
 
  const handleSubmit = (e:React.FormEvent<EventTarget>, userAns:string)=>{
    e.preventDefault()

  
    if(quiz[currentQuestion].answer === userAns){
      setScore(++score)
    }
    
    if(currentQuestion !== quiz.length-1)
      setCurrentQuestion(++currentQuestion);
    else {
      setResult(true)
      setPercent((score/quiz.length)*100)
    }

    }
if(!quiz.length){
  return <h3>Loading...</h3>
}
if(result){
  return(
    <div className="resultCard">
    <h3>Result</h3>
    <p>Your score is {score} out of {quiz.length}</p>
    <p>{percent>=33?"Congratulations! You have Passed with " + percent.toFixed(2) + "% marks": "You are failed"}</p>
      <a className="reStart" href="">Re-Start Quiz</a>
    
    </div>
  )
}
   
  return (
    <div>
      {/* {console.log(quiz[currentQuestion].answer)} */}
        <QuestionCards 
          options={quiz[currentQuestion].option}
          question={quiz[currentQuestion].question}
          callback={handleSubmit}
          
        />
    </div>
  );
}

export default App;
