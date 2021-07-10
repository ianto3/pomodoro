import React, { useState, useEffect } from 'react';
import useInterval from '../hooks/useInterval';

const Timer = ({ sessionLength, breakLength, isTimerRunning }) => {

    const sessionTime = "session";
    const breakTime = "break";

    const [play, setPlay] = useState(false);
    const [minutes, setMinutes] = useState(sessionLength);
    const [seconds, setSeconds] = useState(0);
    const [phase, setPhase] = useState(sessionTime);


    // Add 0 before digit if needed for display
    const pad = (num) => {
        return num < 10 ? "0" + num : num;
    }


    // Control deactivation of timer settings while running countdown
    useEffect(() => {
        if (play) {
            isTimerRunning(true);
        } else {
            isTimerRunning(false);
        }
    }, [play])


    // Handle dynamic changes to settings while running
    useEffect(() => {
        if (phase === sessionTime) {
            setMinutes(sessionLength);
            setSeconds(0);
        }
    }, [sessionLength])

    useEffect(() => {
        if (phase === breakTime) {
            setMinutes(breakLength);
            setSeconds(0);
        }
    }, [breakLength])


    // Counter funcionality
    const counter = () => {
        if (seconds === 0) {
            if (minutes > 0) {
                setMinutes(prevMin => prevMin - 1);
                setSeconds(59);
            } else {
                if (phase === sessionTime) {
                    setPhase(breakTime);
                    setMinutes(breakLength);
                } else {
                    setPhase(sessionTime);
                    setMinutes(sessionLength);
                }
            }
        } else {
            setSeconds(prevSec => prevSec - 1);
        }
    }

    useInterval(counter, play ? 1000 : null);


    // Handle timer reset
    const reset = () => {
        setPlay(false);
        setPhase(sessionTime);
        setMinutes(sessionLength);
        setSeconds(0);
    }


    return (
        <>
            <div className="time-display">
                <span className="time">{pad(minutes)}:{pad(seconds)}</span>
            </div>
            <div className="timer-btns">
                <button className="play-btn" onClick={() => setPlay(!play)}>Play</button>
                <button className="reset-btn" onClick={reset}>Reset</button>
            </div>

        </>
    )
}

export default Timer
