import React from 'react'
import { useState } from 'react'
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import "./NumberOfCoin.css"

export default function NumberOfCoin({changeCoins, isOpen, openClose, openCloseAll, option}) {
    const [open, setOpen] = useState({isOpen:false,
        value:option
      })

    function valueSelect(e){
            changeCoins(parseInt(e.target.getAttribute("data-value")))
            setOpen(prevOpen=>{
                return {isOpen:!prevOpen.isOpen, value:parseInt(e.target.getAttribute("data-value"))}
        })
    }

    function openFunction(e){
        e.stopPropagation()
        openClose(e.currentTarget.getAttribute('data-id'))
    }

    const numberCoin = [
                    {name: "Top 20", value: 20},
                    {name: "Top 50", value: 50},
                    {name: "Top 100", value: 100},
                    ]
    const numberCoinMap = numberCoin.map((el, i)=>{
        return <div className='coinsSelect' key={el.name} onClick={e=>{valueSelect(e)}} data-value={el.value} 
                    style={{backgroundColor: i === selectedCoinStyle() && 'white', color: i=== selectedCoinStyle()  && 'black' }}>
                    {el.name}
                </div>
    })
    function selectedCoinStyle(){
        if(open.value === 20){
            return 0
        } else if(open.value === 50){
            return 1
        }else if(open.value === 100){
            return 2
        }
    }

    function selectedCoinName(){
        if(open.value === 20){
            return numberCoin[0].name
        } else if(open.value === 50){
            return numberCoin[1].name
        }else if(open.value === 100){
            return numberCoin[2].name
        }
    }

  return (
    <div className='allPerformanceCoins'>
        <div onClick={(e)=>openFunction(e)} className='performanceDivCoins text-white' data-id='coins' >
            <div className='flex items-center'>
                {selectedCoinName()}
               {isOpen.coins===true ? <AiFillCaretUp/> : <AiFillCaretDown />}
            </div>
        </div>
        <div onClick={()=>openCloseAll()} className='openDivCoins'>{isOpen.coins && numberCoinMap}</div>
    </div>
  )
}
