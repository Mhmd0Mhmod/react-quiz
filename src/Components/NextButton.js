function NextButton({ dispatch, answer, index, numOfQuestions }) {
  if (answer === null) return null;
  if (index == numOfQuestions - 1) {
    return (
      <>
        <button className="btn btn-ui" onClick={() => dispatch({ type: "finish" })}>
          Finish
        </button>
      </>
    );
  }
  return (
    <>
      <button className="btn btn-ui" onClick={() => dispatch({ type: "nextQuestion" })}>
        Next
      </button>
    </>
  );
}

export default NextButton;
