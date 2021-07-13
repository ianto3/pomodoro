import React from 'react'

const SessionControls = ({ time, incrementFunc, decrementFunc, timerIsRunning }) => {
    return (
        <div className="timer-controls">
            <button className="increment-button" onClick={incrementFunc} disabled={timerIsRunning}>
                <img src={process.env.PUBLIC_URL + `/assets/icons/up-arrow.svg`} alt="Increase time" />
            </button>
            <span className="time-set">{time}</span>
            <button className="decrement-button" onClick={decrementFunc} disabled={timerIsRunning}>
                <img src={process.env.PUBLIC_URL + `/assets/icons/down-arrow.svg`} alt="Decrease time" />
            </button>
        </div>
    )
}

export default SessionControls
