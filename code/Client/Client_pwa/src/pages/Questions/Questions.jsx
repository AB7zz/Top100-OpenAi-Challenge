import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import {useStateContext} from '../../context/StateContext';

const YesOrNo = ({ question, onAnswer }) => {
  const [timer, setTimer] = useState(30);
  const [userAnswer, setUserAnswer] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    if (timer === 0) {
      clearInterval(interval);
      onAnswer('TimeUp');
    }

    return () => clearInterval(interval);
  }, [timer, onAnswer]);

  const handleUserAnswer = (answer) => {
    setUserAnswer(answer);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-100 p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">{question}</h1>
        <div className="flex justify-between">
          <button
            className="bg-green-500 w-full text-white px-4 py-2 rounded-md mr-4 hover:bg-green-600"
            onClick={() => {
              handleUserAnswer('True');
              onAnswer('True');
            }}
          >
            Yes
          </button>
          <button
            className="bg-red-500 w-full text-white px-4 py-2 rounded-md hover:bg-red-600"
            onClick={() => {
              handleUserAnswer('False');
              onAnswer('False');
            }}
          >
            No
          </button>
        </div>
        <p className="mt-4">Time remaining: {timer}s</p>
      </div>
    </div>
  );
};

const MultipleChoice = ({ question, options, onAnswer }) => {
  const [timer, setTimer] = useState(30);
  const [userAnswer, setUserAnswer] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    if (timer === 0) {
      clearInterval(interval);
      onAnswer('TimeUp');
    }

    return () => clearInterval(interval);
  }, [timer, onAnswer]);

  const handleUserAnswer = (answer) => {
    setUserAnswer(answer);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-100 p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">{question}</h1>
        <div className="flex flex-col">
          {options.map((option, index) => (
            <button
              key={index}
              className="bg-zinc-700 w-full text-white px-4 py-2 rounded-md mb-2 hover:bg-blue-600"
              onClick={() => {
                handleUserAnswer(option);
                onAnswer(option);
              }}
            >
              {option}
            </button>
          ))}
        </div>
        <p className="mt-4">Time remaining: {timer}s</p>
      </div>
    </div>
  );
};

function Questions() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([])
  const [className, setClassName] = useState()
  const [score, setScore] = useState(0);
  const {userDetails} = useStateContext()
  const { id } = useParams();

  const handleAnswer = async(userResponse) => {
    const currentQuestion = questions[currentQuestionIndex];
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);

    if (userResponse === 'TimeUp' || userResponse === currentQuestion.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }else{
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      await axios.post('https://eduu-server-dfd0c081bcc6.herokuapp.com/api/wronganswer', {question: currentQuestion.question, uid: localStorage.getItem('uid'), classId: className}, {
        headers: {
          Authorization: localStorage.getItem('accessToken')
        }
      })
    }

  };

  useEffect(() => {
    if (currentQuestionIndex === questions.length) {
      console.log('Final Score:', score);
    }
  }, [currentQuestionIndex, score, questions.length]);
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`https://eduu-server-dfd0c081bcc6.herokuapp.com/api/question/${id}`);
        console.log(response.data)
        setQuestions(response.data.questions)
        setClassName(response.data.className)
      } catch (error) {
        console.log(error)
      }
    }
    fetchQuestion()
  }, [])

  const renderQuestion = (questions) => {
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion.type === 1) {
      return <YesOrNo question={currentQuestion.question} onAnswer={handleAnswer} />;
    } else if (currentQuestion.type === 0) {
      return (
        <MultipleChoice
          question={currentQuestion.question}
          options={currentQuestion.options}
          onAnswer={handleAnswer}
        />
      );
    }

    return null;
  };

  const onSubmit = async() => {
    await axios.post('https://eduu-server-dfd0c081bcc6.herokuapp.com/api/submitanswer', {uid: localStorage.getItem('uid'), testId: id , points: score}, {
      headers: {
        Authorization: localStorage.getItem('accessToken')
      }
    })
    // return
  }


  if(questions &&  currentQuestionIndex == questions.length-1){
    onSubmit();
    return (
      <div className='w-screen h-screen justify-center items-center flex'>
          <div className='font-bold text-3xl w-[20rem] h-[20rem] text-center p-8 flex justify-center items-center rounded-full bg-teal-500 text-white'>
              <p>All questions answered! Final Score: {score || '0'}</p>
          </div>
      </div>
    )
  }

  return (
    <div>
      {questions && currentQuestionIndex < questions.length-1 ? (
        renderQuestion(questions)
      ) : ""}
    </div>
  );
}

export default Questions;
