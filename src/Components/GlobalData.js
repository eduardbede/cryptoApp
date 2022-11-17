import React, { useEffect, useState } from 'react'
import './GlobalData.css'

export default function GlobalData() {

  const [data, setData] = useState([])
  let requestOptions = {
    method: 'GET',
    redirect: 'follow'
    };

  function checkStatus(){
    fetch(`https://api.coingecko.com/api/v3/global`,
        requestOptions)
    .then(response => response.json())
    .then(res=>{
       setData([res?.data])
}).catch(function(){
    console.log('404 Not Found');
  })
}

useEffect(()=>{
  checkStatus()
},[])

const allData = data?.map((el, i)=>{
  function transformToLocale(el){
   return el.toLocaleString('en-US',{
      style: 'currency',
      currency: `usd`,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }

  function transformToLocaleTwo(el){
    return el.toLocaleString('en-US')
   }

  return  <div key={el.total_market_cap.usd} className="globalData">
            <div><span>Cryptos: </span>{transformToLocaleTwo(el.active_cryptocurrencies)}</div>
            <div><span>Exchanges: </span> {transformToLocaleTwo(el.markets)}</div>
            <div><span>Market Cap: </span>{transformToLocale(el.total_market_cap.usd)}</div>
            <div><span>24h Vol: </span>{transformToLocale(el.total_volume.usd)}</div>
            <div><span>Dominance: </span>BTC {el.market_cap_percentage.btc.toFixed(2)}%</div>
          </div>
})

  return (
    <div className='parentGlobalData'>
      {allData}
    </div>
  )
}
