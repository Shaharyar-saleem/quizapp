import React, {useState} from 'react';
import {QuestionPropsType} from '../Types/quiz_types';
import '../App.css';


const QuestionCards:React.FC<QuestionPropsType> = ({options, question, callback}) => {

    const [selectedAns, setSelectedAns] = useState("");
    const handleSelectedAns = (e:any)=>{
      setSelectedAns(e.target.value)
    }
   return(
       <div>
           <h3 className="quiz_title">Online Quiz</h3>
           <div className="question_container">
               <h4 className="question">{question}</h4>
           <form onSubmit={(e:React.FormEvent<EventTarget>)=>callback(e, selectedAns)}>
               {options.map((option: string, index: number)=>{
                   return(
                       <div key={index}>
                       <label>
                         <input type="radio" name="option" value={option} onChange={handleSelectedAns} required checked={selectedAns === option} />{option}
                       </label>
                       </div>
                   )
               })}
               <input type="submit" value="Next"/>
           </form>
           </div>
       </div>
   )
}

export default QuestionCards;