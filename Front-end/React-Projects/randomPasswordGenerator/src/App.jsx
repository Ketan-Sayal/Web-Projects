import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [password, setPassword] = useState("");
  const[length, setLength] = useState(8);
  const passwordRef = useRef(null); 

  const [numberAllowed, setNumberAllowed] = useState(false);
  const [symbolsAllowed, setSymbolsAllowed] = useState(false);

  const genratePassword = useCallback(()=>{
    let pass = "";
    let  str = "asdfhjklmnbvcxzqwertyuiopASDFGHJKLMNBVCXZQWERTYUIOP";
    let numbers = "0123456789";
    let symbols ="!@#$%^&*()_+={}[]";
    if(numberAllowed) str+=numbers;
    if(symbolsAllowed) str+=symbols;
    for(let i=0; i<length; i++){
      pass +=str[Math.floor(Math.random()*str.length)];
    }
    setPassword(pass);
  }, [password, length, setPassword]);

  useEffect(()=>{
    genratePassword();
  }, [numberAllowed, symbolsAllowed, setPassword, length])

  let copyMe = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className='w-full min-h-screen py-12 bg-zinc-800'>
         <div className='mx-auto flex-col px-3 w-96 rounded-lg h-[11rem] space-x-2 bg-zinc-500'>
          <div className='flex'>
          <input 
          type="text" 
          readOnly
          className='rounded-lg h-1/6 mt-3 outline-none py-1 mx-auto w-80 px-2 text-xl font-semibold text-red-800'
          value={password}
          ref={passwordRef}
          />
          <button className='bg-slate-800 text-white h-1/6 rounded-lg mt-3 w-1/3 text-lg py-1'
          onClick={copyMe}
          >Copy</button>
          </div>
          <div className='flex mt-3 space-x-3'>
            <input type="checkbox" id="number"
            onChange={()=>setNumberAllowed((prev)=>!prev)}
            />
            <label htmlFor="number">Numbers</label>
          </div>
          <div className='flex mt-3 space-x-3'>
            <input type="checkbox" id="symbol"
            onChange={()=>setSymbolsAllowed((prev)=>!prev)}
            />
            <label htmlFor="symbol">Symbols</label>
          </div>
          <div className='flex mt-3 space-x-3'>
            <input type="range" id="range"
            min={6}
            max={100}
            defaultValue={8}
            onChange={(e)=>setLength(e.target.value)}
            />
            <label htmlFor="range">Length: {length}</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
