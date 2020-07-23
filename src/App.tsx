import React, {useEffect, useState} from 'react';
import {getQuizQuestion} from './Services/quiz';
import {QuizType} from './Types/quiz_types';
import QuestionCards from './Components/QuestionCards';


function App() {
  const [quiz, setQuiz]= useState<QuizType[]>([])
  let [currentQuestion, setCurrentQuestion]= useState(0)
  let [score, setScore]=useState(0)

  
  useEffect(()=>{
    async function getQuestions(){
      const questions: QuizType[] = await getQuizQuestion(3, 'easy')
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
      alert("Your score is "+ score + " out of "+ quiz.length);
      setCurrentQuestion(0);
      setScore(0);
    }

    }

  
  if(!quiz.length)
   return <h3>Loading...</h3>
  return (
    <div>
      {console.log(quiz[currentQuestion].answer)}
        <QuestionCards 
          options={quiz[currentQuestion].option}
          question={quiz[currentQuestion].question}
          callback={handleSubmit}
        />
    </div>
  );
}

export default App;
