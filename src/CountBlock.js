import React, {useState, useEffect} from "react";
import { useTimer } from 'react-timer-hook';

function CountBlock() {
  // state of start btn
    const [start, setStart] = useState(false);
  // state of pause btn 
    const [pauseBtn, setPauseBtn] = useState(false);
  // mintues count
    const [minCount, setMinCount] = useState(25);
  // seconds count 
    const [secCount, setSecCount] = useState(0);
   // countdown total time in seconds 
    const [count, setCount] = useState(minCount * 60);
  // countdown total time in seconds 
       //const [count, setCount] = useState(minCount * 60);
  //state of over 
    const [over, setOver] = useState(false);
  
   
    function increment() {
        setMinCount(prevMinCount => prevMinCount + 1);
        setCount(prevCount => prevCount + 60);
    }
    
    function decrement() {
        setMinCount(prevMinCount => prevMinCount - 1);
        setCount(prevCount => prevCount - 60);
    }

    useEffect(() => {
      const timerID = setInterval(() => tick(), 1000);
      return () => clearInterval(timerID);
    }, [minCount, secCount, start, count, over]);

    function countDown() {
      setStart(true);
      setPauseBtn(false);
    }

    var time;
    if(minCount === 0){time = "00:" + secCount;}
    if (secCount === 0) {
      time = minCount + ":00"
    } else if(minCount === 0){
      time = "00:" + secCount;
      if (secCount < 10) {
      time = "00:" + "0" + secCount;
      }
    }else if(secCount < 10){
      time = minCount + ":0" + secCount;
    }else{
      time = minCount + ":" + secCount;
    }

    var message;
    if(!pauseBtn){
      message = "Happy Task Time";
    }else if(pauseBtn){
      message = "Timer Paused";
    }else if (!pauseBtn && over){
      message = "Times Up";
    }
    
    const tick = () =>{
        if (pauseBtn) return;
        if (start) {
          if(minCount === 0 && secCount === 0){
            setStart(false);
            setOver(true);
          }else if (secCount === 0) {
            setMinCount(minCount - 1);
            setSecCount(59);
          }else{
            setSecCount(secCount - 1);
          }
        }
      }


    function pause(){
      setStart(false);
      setPauseBtn(true);
      setSecCount(prevSecCount => prevSecCount);
      
    }

    return (
        <div style={{textAlign: 'center'}}>
          <h1 style={{margin:'50px'}}>Pomadero Task Timer</h1>
          <div style={{fontSize: '100px'}}>
            <span>{time}</span>
          </div>
          <p>{message}</p>
          <button class="btn-primary" onClick={decrement}>-</button>
          <button class="btn-primary" onClick={countDown}>Start</button>
          <button class="btn-primary" onClick={pause}>Pause</button>
          <button class="btn-primary" onClick={increment}>+</button>
        </div>
      );
}

export default CountBlock;