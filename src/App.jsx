import {useEffect, useReducer} from "react";
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
import {QuizProvider, useQuiz} from "./Context/QuizContext";

function App() {
    const {status} = useQuiz();
    return (

            <div className="app">
                <Header/>
                <Main>
                    {status === "loading" && <Loader/>}
                    {status === "error" && <Error/>}
                    {status === "ready" && <StartScreen/>}
                    {status === "active" && (
                        <>
                            <Progress/>
                            <Question/>
                            <Footer>
                                <Timer/>
                                <NextButton/>
                            </Footer>
                        </>
                    )}
                    {status === "finish" &&
                        <FinishScreen />}
                </Main>
            </div>
    );
}

export default App;
