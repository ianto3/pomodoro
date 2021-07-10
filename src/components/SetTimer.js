import React from 'react'

const SessionControls = ({ time, incrementFunc, decrementFunc, timerIsRunning }) => {
    return (
        <div className="timer-controls">
            <button className="increment-button" onClick={incrementFunc} disabled={timerIsRunning}>up</button>
            <span className="time-set">{time}</span>
            <button className="decrement-button" onClick={decrementFunc} disabled={timerIsRunning}>down</button>
        </div>
    )
}

export default SessionControls
