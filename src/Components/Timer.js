import { useEffect } from "react";

export default function Timer({ dispatch, secondRemaning }) {
  const mins = Math.floor(secondRemaning / 60);
  const secs = secondRemaning % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
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
