import { useState, useEffect } from "react";

function useCurrencyInfo(currency){
    const [data, setData] = useState('usd');

    const fetchData = async ()=>{
        let res = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`);
        let resData = await res.json();
        setData(resData[currency]);
        // console.log(resData[currency]);
    }

        useEffect((currency)=>{
            fetchData(currency);
        })
    return data;
}

export default useCurrencyInfo;