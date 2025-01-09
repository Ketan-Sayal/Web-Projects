import { useEffect, useState, useRef } from 'react'
import InputBox from './components/InputBox.jsx'
import useCurrencyInfo from './hooks/useCurrencyInfo.js'

function App() {
  const [currencyTo, setCurrencyTo] = useState('inr');
  const [ammountTo, setAmmountTo] =  useState(0);
  const [currencyFrom, setCurrencyFrom] = useState('usd');
  const [ammountFrom, setAmmountFrom] = useState(0);
  const currencyInfo = useCurrencyInfo(currencyFrom);
  const inputBox1 = useRef(null);
  const inputBox2 = useRef(null);
  
  let Options= (currency)=>{
    let currencyInfo = useCurrencyInfo(currency);
    let options = Object.keys(currencyInfo);
    return options; 
  }

  useEffect(()=>{
    
      let newAmmount = currencyInfo[currencyTo]*ammountFrom;
      setAmmountTo(newAmmount); // Donot use fns in hooks and donot write hook inside other hooks
      setAmmountFrom(prev=>prev);
    
  }, [ammountFrom, currencyFrom, currencyTo])

  let swap = ()=>{
    const temp = currencyFrom;
    setCurrencyFrom(currencyTo);
    setCurrencyTo(temp);

    const tempAmmount = ammountTo;
    setAmmountTo(ammountFrom);
    setAmmountFrom(tempAmmount);
  }

  return (
    <>
      <div className='min-h-screen bg-black p-5 flex flex-col space-y-2 items-center'>
        <InputBox
        tag='from'
        refrance={inputBox1}
        currency = {currencyFrom}
        ammount={ammountFrom}
        onCurrencyChange={(currency)=>setCurrencyFrom(currency)}
        onAmmountChange = {(ammount)=>setAmmountFrom(ammount)}
        currencyOptions={Options(currencyFrom)}
        />
        <button className='absolute bg-blue-600 text-white top-24 px-2 py-2 text-sm rounded-lg'
        onClick={swap}
        >Swap</button>
        <InputBox 
        tag='to'
        refrance={inputBox2}
        currency = {currencyTo}
        ammount={ammountTo}
        onCurrencyChange={(currency)=>setCurrencyTo(currency)}
        onAmmountChange = {(ammount)=>setAmmountTo(ammount)}
        currencyOptions={Options(currencyTo)}
        inputDisabled = {true}
        selecDisabled={true}
        />
      </div>
    </>
  )
}

export default App
