import { useEffect, useReducer } from "react";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Error from "./Components/Error";
import Loader from "./Components/Loader";
import StartScreen from "./Components/StartScreen";
import Question from "./Components/Question";
import NextButton from "./Components/NextButton";
import Progress from "./Components/Progress";
import FinishScreen from "./Components/FinishScreen";
import Footer from "./Components/Footer";
import Timer from "./Components/Timer";
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
function App() {
  const [{ questions, status, index, answer, points, highScore, secondRemaning }, dispatch] = useReducer(
    reducer,
    initalState
  );
  const maxPoints = questions.reduce((acc, el) => acc + el.points, 0);
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen numQuestions={questions.length} dispatch={dispatch} />}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={questions.length}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question question={questions[index]} dispatch={dispatch} answer={answer} />
            <Footer>
              <Timer dispatch={dispatch} secondRemaning={secondRemaning} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numOfQuestions={questions.length}
              />
            </Footer>
          </>
        )}
        {status === "finish" && (
          <FinishScreen points={points} maxPoints={maxPoints} highScore={highScore} dispatch={dispatch} />
        )}
      </Main>
    </div>
  );
}
export default App;
