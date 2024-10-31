import { createContext, useContext, useEffect, useReducer } from "react";
import Error from "../Components/Error";

const QuizContext = createContext();
const initalState = {
  questions: [],
  // "loading" , "error","ready","active","finish"
  status: "loading",
  answer: null,
  index: 0,
  points: 0,
  highScore: 0,
  secondRemaning: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
        secondRemaning: state.questions.length * 30,
      };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points: question.correctOption === action.payload ? state.points + question.points : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return { ...state, status: "finish", highScore: Math.max(state.highScore, state.points) };
    case "restart":
      return { ...initalState, status: "ready", questions: state.questions };
    case "tick":
      return {
        ...state,
        secondRemaning: state.secondRemaning - 1,
        status: state.secondRemaning === 0 ? "finish" : state.status,
      };

    default:
      throw new Error("UnKown Action");
  }
}

function QuizProvider({ children }) {
  const [{ questions, status, index, answer, points, highScore, secondRemaning }, dispatch] = useReducer(reducer, initalState);
  const maxPoints = questions.reduce((acc, el) => acc + el.points, 0);
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <QuizContext.Provider
      value={{
        questions,
        numQuestions: questions.length,
        status,
        index,
        answer,
        points,
        highScore,
        secondRemaning,
        maxPoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}

export { QuizProvider, useQuiz };
