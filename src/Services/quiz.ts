import {QuestionType, QuizType} from '../Types/quiz_types';

const shuffleArray = (array: any[]) => 
 [...array].sort(() => Math.random() - 0.5)

export const getQuizQuestion =  async (total: number, level: string): Promise<QuizType[]> =>{

    const api = await fetch(`https://opentdb.com/api.php?amount=${total}&difficulty=${level}&type=multiple`)
    const {results} = await api.json()
    const quiz:QuizType[] = results.map((QuestionObj: QuestionType)=>{
      return{
          question: QuestionObj.question,
          answer: QuestionObj.correct_answer,
          option: shuffleArray(QuestionObj.incorrect_answers.concat(QuestionObj.correct_answer))

      }
    })
    return quiz;
}
