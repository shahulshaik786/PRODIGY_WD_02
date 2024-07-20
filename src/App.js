// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else if (!isRunning) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const startStopHandler = () => {
    setIsRunning(!isRunning);
  };

  const resetHandler = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const lapHandler = () => {
    setLaps([...laps, time]);
  };

  const formatTime = (time) => {
    const getMilliseconds = `0${(time % 1000) / 10}`.slice(-2);
    const seconds = Math.floor((time / 1000) % 60);
    const getSeconds = `0${seconds}`.slice(-2);
    const minutes = Math.floor((time / 60000) % 60);
    const getMinutes = `0${minutes}`.slice(-2);
    const hours = Math.floor(time / 3600000);
    const getHours = `0${hours}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}:${getMilliseconds}`;
  };

  return (
    <div className="App">
      <video autoPlay muted loop id="background-video">
        <source src="https://cdn.pixabay.com/video/2020/01/18/31377-386628887_large.mp4?width=1920&hash=a2322a0264c76f4785f40ebfdc98ceef3e1c60ee" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="container">
        <h1>Stopwatch</h1>
        <div id="display">{formatTime(time)}</div>
        <div className="buttons">
          <button onClick={startStopHandler}>{isRunning ? 'Pause' : 'Start'}</button>
          <button onClick={resetHandler}>Reset</button>
          <button onClick={lapHandler} disabled={!isRunning}>Lap</button>
        </div>
        <div id="laps">
          {laps.map((lap, index) => (
            <div key={index}>Lap {index + 1}: {formatTime(lap)}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
