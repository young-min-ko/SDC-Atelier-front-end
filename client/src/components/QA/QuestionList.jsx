import React from 'react';
// import './assets/styles.css'
import axios from 'axios';
import {Accordion, Wrapper} from './assets/styles.js'
import IndividualQuestion from './IndividualQuestion.jsx'
// react hooks
const { useState, useEffect } = React;

const QuestionList = () => {

  //Local Variables
  const start = 0;
  const endStart = 2
  // States
  // const [selected, setSelected] = useState(null)
  const [end, setEnd] = useState(endStart)
  const [productId, setProductId] = useState('37314')
  const [renderQ, setRenderQ] = useState([])
  const [questions, setQuestions] = useState([])
  const [hide, setHide] = useState(true)

  // Hooks
  useEffect(()=> {

    // Config for request
    const config = {
      params: {product_id: productId},
      headers:{'Authorization':'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'}
    }

    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions', config)
    .then((res)=>{
      setQuestions(res.data.results)
      setRenderQ(res.data.results.slice(start, end))
    })
    .catch((error)=>{
      console.error(error)
    })



  }, [productId])

  useEffect(()=>{
    if (end !== endStart && end >= questions.length) {
      setHide(false);
    }
  }, [end])

  // Handlers
  const loadMore = () => {
    if (renderQ.length < questions.length) {
      let newEnd = end + 2
      let newResults = questions.slice(start, newEnd)
      setEnd(newEnd)
      setRenderQ(newResults)
    }
  }
  // const handleSort = () => {

  // }
  return (
    <span> Questions & Answers
    <Wrapper>
    <div>
      <Accordion>
      <div className="Accordion">
        {(renderQ.length === 0) ? <button className='AddQuestion'>Add a question</button> :<></>}
        {renderQ.map(function(question, index) {
          return (
            <IndividualQuestion key={index} question={question} open={open}/>
          )
        })}
      </div>
      {hide ? <button onClick={loadMore}> Load more questions </button> : <></>}
      </Accordion>
    </div>
    </Wrapper>
    </span>

  )
}

export default QuestionList;


// {questions.map(function(question, index){
//   questionsAmount++
//   if(questionsAmount < 5){
//   return(


//     <div className='Question' key={index}>
//       {/* in the future this should render a question component */}

//       <h2 className='Title' onClick={()=>{ toggle(index) }}>
//         {`Question ${index + 1}`}
//       </h2>

//       <span>{selected === index ? '-': '+'}</span>
//       <div className={selected === index ? 'Body show': 'Body'}>
//         {`Question Body: ${question.question_body}`}
//       </div>
//     </div>

// )}
// })}