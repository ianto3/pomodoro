import React, { useState, useEffect } from 'react';
import useInterval from '../hooks/useInterval';

const Timer = ({ sessionLength, breakLength, isTimerRunning }) => {

    const sessionTime = "Session";
    const breakTime = "Break";
    const timerIndicator = document.querySelector(".time-indicator");

    const [play, setPlay] = useState(false);
    const [minutes, setMinutes] = useState(sessionLength);
    const [seconds, setSeconds] = useState(0);
    const [phase, setPhase] = useState(sessionTime);
    const [totalDeg, setTotalDeg] = useState(0);

    const [audio] = useState(new Audio(process.env.PUBLIC_URL + "/assets/sounds/alarm.mp3"));


    // Add 0 before digit if needed for display
    const pad = (num) => {
        return num < 10 ? "0" + num : num;
    }


    const rotateIndicator = (phase, minutes, seconds) => {
        const totalTime = (phase === sessionTime ? sessionLength : breakLength) * 60;
        const degreeTick = 360 / totalTime;
        const timeElapsed = totalTime - (minutes * 60 + seconds) + 1;
        const newDegPosition = timeElapsed * degreeTick + degreeTick / 2;

        if (newDegPosition >= 360) {
            timerIndicator.style.transform = `rotate(${totalDeg + 360}deg)`;

        } else {
            timerIndicator.style.transform = `rotate(${totalDeg + newDegPosition}deg)`;
        }

        // Keep adding degrees to avoid counterclockwise animation to reset degrees each turn
        if (minutes === 0 && seconds === 0) {
            setTotalDeg(prevTotalDeg => prevTotalDeg + 360);
        }
    }


    // Control deactivation of timer settings while running countdown
    useEffect(() => {
        if (play) {
            isTimerRunning(true);
            timerIndicator.classList.add("active");
        } else {
            isTimerRunning(false);
            // Condition avoids error on loading component since element is null at mount
            if (timerIndicator) {
                timerIndicator.classList.remove("active");
            }
        }
    }, [play, isTimerRunning, timerIndicator])


    // Handle dynamic changes to settings
    useEffect(() => {
        if (phase === sessionTime) {
            setMinutes(sessionLength);
            setSeconds(0);
        }
    }, [sessionLength, phase])

    useEffect(() => {
        if (phase === breakTime) {
            setMinutes(breakLength);
            setSeconds(0);
        }
    }, [breakLength, phase])


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
                audio.play();
            }
        } else {
            setSeconds(prevSec => prevSec - 1);
        }
        rotateIndicator(phase, minutes, seconds);
    }

    useInterval(counter, play ? 1000 : null);

    // Handle timer reset
    const reset = () => {
        setPlay(false);
        setPhase(sessionTime);
        setMinutes(sessionLength);
        setSeconds(0);
        timerIndicator.style.transform = `rotate(${totalDeg}deg)`;
    }


    return (
        <>
            <div className="time-display">
                <div className="time-indicator"></div>
                <span className="time-phase">{phase}</span>
                {(minutes === 0 && seconds <= 10)
                    ? <span className="time final-countdown">{seconds}</span>
                    : <span className="time">{pad(minutes)}:{pad(seconds)}</span>}
            </div>
            <div className="timer-btns">
                <button className="play-btn" onClick={() => setPlay(!play)}>
                    <img src={process.env.PUBLIC_URL + `/assets/icons/${play ? "pause" : "play"}.svg`} alt={play ? "pause" : "play"} />
                </button>
                <button className="reset-btn" onClick={reset}>
                    <img src={process.env.PUBLIC_URL + `/assets/icons/reset.svg`} alt="reset" />
                </button>
            </div>

        </>
    )
}

export default Timer
