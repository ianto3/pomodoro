import React, { useState, useEffect } from 'react';
import SetTimer from "./components/SetTimer";
import './App.css';


function App() {

  const [sessionLength, setSessionLength] = useState("");
  const [breakLength, setBreakLength] = useState("");

  // Time setting handlers
  const addSessionLength = () => {
    if (sessionLength < 90) {
      setSessionLength(prevLength => prevLength + 1);
    }
  }

  const reduceSessionLength = () => {
    if (sessionLength > 0) {
      setSessionLength(prevLength => prevLength - 1);
    }
  }

  const addBreakLength = () => {
    if (breakLength < 90) {
      setBreakLength(prevBreak => prevBreak + 1);
    }
  }

  const reduceBreakLength = () => {
    if (breakLength > 0) {
      setBreakLength(prevBreak => prevBreak - 1)
    }
  }

  const resetValues = () => {
    setSessionLength(25);
    setBreakLength(5);
  }

  useEffect(() => {
    resetValues();
  }, [])

  return (
    <div className="App container">
      <h1>
        Pomodoro Tracker
      </h1>
      <div className="settings-controllers">
        <SetTimer time={sessionLength} incrementFunc={addSessionLength} decrementFunc={reduceSessionLength} />
        <SetTimer time={breakLength} incrementFunc={addBreakLength} decrementFunc={reduceBreakLength} />
      </div>
    </div>
  );
}

export default App;
