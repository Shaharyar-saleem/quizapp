import React, {useState} from 'react';
import {QuestionPropsType} from '../Types/quiz_types';


const QuestionCards:React.FC<QuestionPropsType> = ({options, question, callback}) => {

    const [selectedAns, setSelectedAns] = useState("");
    const handleSelectedAns = (e:any)=>{
      setSelectedAns(e.target.value)
    }
   return(
       <div>
           <div className="question_container">
               <h4>{question}</h4>
           </div>
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
               <input type="submit"/>
           </form>
       </div>
   )
}

export default QuestionCards;