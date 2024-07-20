import React from "react";

function Options({ question, dispatch, answer }) {
  return (
    <div className="options">
      {question.options.map((el, i) => (
        <button
          className={`btn btn-option ${i === answer ? "answer" : ""} ${
            answer === null ? "" : i === question.correctOption ? "correct" : "wrong"
          } `}
          key={i}
          disabled={!(answer === null)}
          onClick={() => dispatch({ type: "newAnswer", payload: i })}
        >
          {el}
        </button>
      ))}
    </div>
  );
}

export default Options;
