import { useRef, useState } from 'react'

function App() {
  const [isStart, setIsStart] = useState(false);
  const [laps, setLaps] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [currTime, setCurrTime] = useState(null);
  const intervalRef = useRef();

  const startStop =()=>{

    // WHEN WATCH IS STARTING
    if(!isStart){
      setIsStart(true);
      setStartTime(Date.now());
      intervalRef.current = setInterval(()=>{
        setCurrTime(Date.now());
      }, 10);
    }else{
      setIsStart(false);
      clearInterval(intervalRef.current);
    }
  }

  const secounds = ()=>{
    if(startTime!=null && currTime!=null){
      return ((currTime - startTime)/1000).toFixed(2);
    } 
  }

  let currSec = secounds() || 0;// If useState variables change this will also change

  const lap = ()=>{
    setLaps((prev)=>[...prev, currSec]);
  }

  return (
    <div className='bg-zinc-100 flex-col min-h-screen flex items-center py-8'>
      <div className='w-1/2 space-y-8'>
      <div className='time text-9xl text-center font-light'>{currSec}</div>
      <div className='laps mx-auto w-33 h-56 overflow-y-scroll'>
        {laps && laps.map((lap, i)=>(
          <div key={i} className='w-full text-xl'>{i+1}. <span className='font-medium'>{lap}</span></div>
        ))}
      </div>
      <div className='flex w-full justify-between'>
        <button 
        onClick={startStop} 
        className={`${isStart?"bg-red-500 hover:bg-red-400":"bg-blue-500 hover:bg-blue-400"} px-2 font-medium py-3 text-lg rounded-lg w-44 text-white cursor-pointer  outline-none`}>{isStart?"Stop": "Start"}</button>
        <button 
        onClick={lap}
        className='bg-blue-500 px-2 py-3 text-lg rounded-lg w-44 text-white font-medium cursor-pointer hover:bg-blue-400 outline-none'>Lap</button>
      </div>
      </div>
    </div>
  )
}

export default App
