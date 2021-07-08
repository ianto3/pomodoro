import React from 'react'

const SessionControls = ({ time, incrementFunc, decrementFunc }) => {
    return (
        <div className="control-timer">
            <button className="increment-button" onClick={incrementFunc}>up</button>
            <span>{time}</span>
            <button className="decrement-button" onClick={decrementFunc}>down</button>
        </div>
    )
}

export default SessionControls
