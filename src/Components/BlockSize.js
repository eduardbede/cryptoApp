import React from 'react'
import { useState } from 'react'
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import './BlockSize.css'

export default function BlockSize({changeBlockSize, isOpen, openClose, openCloseAll, option}){
    const [open, setOpen] = useState({isOpen:false,
        value:option
      })

    const blockSize = [
        {name: "Market Cap", value: 20},
        {name: "Volume 24h", value: 50},/* 
        {name: "Price 1h", value: 2},
        {name: "Price 1d", value: 3},
        {name: "Price 1w", value: 4} */
    ]
    function valueSelect(e){
        changeBlockSize(parseInt(e.target.getAttribute("data-value")))
        setOpen(prevOpen=>{
            return {isOpen:!prevOpen.isOpen, value:parseInt(e.target.getAttribute("data-value"))}
        })
    }
    function openFunction(e){
        e.stopPropagation()
        openClose(e.currentTarget.getAttribute('data-id'))
    }

const performanceMap = blockSize.map((el, i)=>{
    return <div className='blockSelect' key={el.name} onClick={e=>{valueSelect(e)}} data-value={i} 
                style={{backgroundColor: i === open.value && 'white', color: i=== open.value  && 'black' }}>
                    {el.name}
           </div>
})

  return (
    <div className='allPerformanceBlock'>
        <div onClick={(e)=>openFunction(e)} data-id='block' className='blockDiv text-white' >
            <div className='flex items-center'>
                <div>Block Size: {blockSize[open.value].name}</div>
               {isOpen.block===true ? <AiFillCaretUp/> : <AiFillCaretDown />}
            </div>
        </div>
        <div onClick={()=>openCloseAll()} className='openBlockDiv'>{isOpen.block && performanceMap}</div>
    </div>
  )
}
