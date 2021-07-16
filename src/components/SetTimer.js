import React from 'react'

const SessionControls = ({ time, incrementFunc, decrementFunc, timerIsRunning }) => {
    return (
        <div className="timer-controls">
            <button className="increment-button" aria-label="increment value" onClick={incrementFunc} disabled={timerIsRunning}>
                <img src={process.env.PUBLIC_URL + `/assets/icons/up-arrow.svg`} alt="Up arrow" />
            </button>
            <span className="time-set">{time}</span>
            <button className="decrement-button" aria-label="decrement value" onClick={decrementFunc} disabled={timerIsRunning}>
                <img src={process.env.PUBLIC_URL + `/assets/icons/down-arrow.svg`} alt="Down arrow" />
            </button>
        </div>
    )
}

export default SessionControls
