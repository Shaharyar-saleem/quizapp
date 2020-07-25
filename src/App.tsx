import React, {useEffect, useState} from 'react';
import {getQuizQuestion} from './Services/quiz';
import {QuizType} from './Types/quiz_types';
import QuestionCards from './Components/QuestionCards';
import { Pie } from 'react-chartjs-2';


function App() {
  const [quiz, setQuiz]= useState<QuizType[]>([])
  let [currentQuestion, setCurrentQuestion]= useState(0)
  let [score, setScore]=useState(0);
  const [result, setResult]= useState(false);
  let [percent, setPercent]= useState(0);
 
  useEffect(()=>{
    async function getQuestions(){
      const questions: QuizType[] = await getQuizQuestion(10, 'easy')
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
const PieChart =  <Pie
  data={{
      labels: ['Correct Answers', 'Incorrect Ans'],
      datasets:[{
          label: 'Questions',
          backgroundColor: [
              'rgba(0, 0, 255, 0.5)',
              '#f13232',
          ],
         data:[score, quiz.length],
      }],
  }}
  />
if(result){
  return(
    <div className="resultCard">
    <h3>Result</h3>
    <p>Your score is {score} out of {quiz.length}</p>
    <p>{percent>=40?"Congratulations! You have Passed with " + percent.toFixed(2) + "% marks": "You are failed"}</p>
      {PieChart}
      <a className="reStart" href="">Re-Start Quiz</a>
    </div>
  )
}
   
  return (
    <div>
        <QuestionCards 
          options={quiz[currentQuestion].option}
          question={quiz[currentQuestion].question}
          callback={handleSubmit}
          
        />
    </div>
  );
}

export default App;
