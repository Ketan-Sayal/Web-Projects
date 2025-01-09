import { useState, useId } from "react";

function InputBox({
    tag = 'to',
    currency = 'usd',
    ammount=0,
    onCurrencyChange,
    onAmmountChange,
    currencyOptions=[],
    inputDisabled = false,
    selecDisabled = false,
    refrance=null,
})
{
    const id = useId();// It creates a single unique id
    const nonNegitive =(value)=>{
        if(parseFloat(value)<0){
            onAmmountChange(0);
        }
        else{
            onAmmountChange(value);
        }
    }

    

    return(
        <div className="bg-white min-h-24 w-96 flex flex-col px-4 py-2 space-y-3">
            <h1 className="font-bold">{tag}:</h1>
            <div className="flex space-x-28">
            <input 
            type="number"
            ref={refrance}
            value={ammount/**() means it will give value*/}
            disabled={inputDisabled}
            className="outline-none"
            onChange={(e)=>nonNegitive(e.target.value)}
            />
            <select name="" id="" className="outline-none text-black"
            value={currency}
            disabled={selecDisabled}
            onChange={(e)=>onCurrencyChange(e.target.value)}/**Not every time only when value is changed on click only*/>
                {currencyOptions.map(currency=>(
                    <option 
                    value={currency} 
                    defaultValue='usd'
                    key={currency} 
                    onClick={()=>onCurrencyChange(currency)}
                    >{currency}</option>
                ))}
            </select>
            </div>
        </div>
    );
}

export default InputBox;