import {useEffect} from "react";
import {useQuiz} from "../Context/QuizContext";

export default function Timer() {
    const {dispatch, secondRemaning} = useQuiz();
    const mins = Math.floor(secondRemaning / 60);
    const secs = secondRemaning % 60;
    useEffect(
        function () {
            const id = setInterval(function () {
                dispatch({type: "tick"});
            }, 1000);
            return () => clearInterval(id);
        },
        [dispatch]
    );
    return (
        <div className="timer">
            {mins < 10 ? "0" : ""}
            {mins}:{secs}
        </div>
    );
}
