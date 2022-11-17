import React from 'react'
import { useState } from 'react'
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import './CurrencySelect.css'

export default function CurrencySelect({changeCurrency, isOpen, openClose, openCloseAll, option}) {
    const [open, setOpen] = useState({
                                        isOpen:false,
                                        value:option
                                    })

function valueSelect(e){
        changeCurrency(parseInt(e.target.getAttribute("data-value")));
        setOpen(prevOpen=>{
                return {isOpen:!prevOpen.isOpen, value:parseInt(e.target.getAttribute("data-value"))};
        })
}

function openFunction(e){
    e.stopPropagation()
    openClose(e.currentTarget.getAttribute('data-id'))
}

const currency = [
    {
     name: "USD $", 
     value: 0, 
     imageUrl: "https://static.coinstats.app/flags/USD_r.png"
    },
    {
     name: "EUR €", 
     value: 1,
     imageUrl: "https://static.coinstats.app/flags/EUR_r.png"},
    {
     name: "GBP £", 
     value: 2,
     imageUrl: "https://static.coinstats.app/flags/GBP_r.png"
    },
    {
     name: "AUD A$", 
     value: 3,
     imageUrl: "https://static.coinstats.app/flags/AUD_r.png"
    },
    {
     name: "CAD CA$", 
     value: 4,
     imageUrl: "https://static.coinstats.app/flags/CAD_r.png"
    },
    {
     name: "CNY ¥", 
     value: 5,
     imageUrl: "https://static.coinstats.app/flags/CNY_r.png"
    },
    {
     name: "JPY ¥", 
     value: 6,
     imageUrl: "https://static.coinstats.app/flags/JPY_r.png"
    }
]

const currencyMap = currency.map((el, i)=>{
        return <div className='currencySelect' key={el.name} onClick={e=>{valueSelect(e)}} data-value={i} 
                    style={{backgroundColor: i === open.value && 'white', color: i=== open.value  && 'black' }}>
                <img className='currencyImg' src={el.imageUrl} data-value={i} alt='' ></img>
                <div data-value={i}>{el.name}</div>
               </div>
})

  return (
    <div className='allCurrency'>
        <div onClick={(e)=>openFunction(e)} className='currencyDiv text-white' data-id='currency' >
            <div className='flex items-center'>
               <div className='flex gap-1 items-center'>Currency: 
                <img className='currencyImg' src={currency[open?.value]?.imageUrl} alt=''></img>
                {currency[open?.value]?.name}</div>
               {isOpen.currency === true ? <AiFillCaretUp/> : <AiFillCaretDown />}
            </div>
        </div>
        <div onClick={()=>openCloseAll()} className='openDivCurrency'>{isOpen.currency && currencyMap}</div>
    </div>
  )
}
