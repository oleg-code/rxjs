import { useEffect, useState } from "react";
import { timer } from "rxjs";
import Time from "./Time/Time";
import { first } from 'rxjs/operators';

const App = () => {
  const intervalRX = timer(1000);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  useEffect(() => {
    let interval = null;
    let sec = seconds;
    let min = minutes;
    let hh = hours;
    interval = intervalRX.subscribe(() => {
      if (isRunning) {
        sec++;
        setSeconds(sec);
        if (seconds >= 59) {
          setSeconds(0);
          min++;
          setMinutes(min);
          if (minutes >= 59) {
            setMinutes(0);
            hh++;
            setHours(hh);
          }
        }
      }
    });
    return () => interval.unsubscribe();
  }, [isRunning, seconds, minutes, hours, intervalRX]);

  const handleClick = (button) => {
    const running = isRunning;
    if (button === "Start") {
      setIsRunning(!running);
    } else if (button === "Stop") {
      setSeconds(0);
      setMinutes(0);
      setHours(0);
      setIsRunning(!running);
    }
  };

  const handleReset = () => {
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    setIsRunning(true);
  };

  const handleDoubleClick = () => {
    const dbTimer = timer(300)
    dbTimer.pipe(first()).subscribe(()=> {
      setIsRunning(false);
    })
  };

  return (
    <div className="App">
      <div className="time">
        <Time hours={hours} minutes={minutes} seconds={seconds} />
      </div>
      <div className="control-buttons">
        <button
          onClick={
            isRunning ? () => handleClick("Stop") : () => handleClick("Start")
          }
        >
          {isRunning ? "Stop" : "Start"}
        </button>
        <button onDoubleClick={handleDoubleClick}>Wait</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default App;
