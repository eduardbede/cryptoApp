import React, { useState } from 'react'
import './PerformanceComponent.css'
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";


export default function PerformanceComponent({changePerformance, isOpen, openClose, openCloseAll, option}) {
const [open, setOpen] = useState({
                                  isOpen:false,
                                  value:option
                                })

function valueSelect(e){
        changePerformance(parseInt(e.target.getAttribute("data-value")))
        setOpen(prevOpen=>{
            return {isOpen:!prevOpen.isOpen, value:parseInt(e.target.getAttribute("data-value"))}
        })
}

function openFunction(e){
    e.stopPropagation()
    openClose(e.currentTarget.getAttribute('data-id')) 
}
const performance = [
                        {name: "1 Hour", value: 0},
                        {name: "24 Hours", value: 1},
                        {name: "1 Week", value: 2},
                        {name: "30 Days", value: 3},
                        {name: "1 Year", value: 4},
                    ]
const performanceMap = performance.map((el, i)=>{
    return <div className='performanceSelect' key={el.name} onClick={e=>{valueSelect(e)}} data-value={i}
                style={{backgroundColor: i === open.value && 'white', color: i=== open.value  && 'black', }} >
            {el.name}
           </div>
})

  return (
    <div className='allPerformance'>
        <div onClick={(e)=>{openFunction(e)}} data-id="performance" className='performanceDiv text-white' >
            <div className='flex items-center'>
                <div>Performance: {performance[open.value].name}</div>
               {isOpen.performance===true ? <AiFillCaretUp/> : <AiFillCaretDown />}
            </div>
        </div>
        <div className='openDiv' onClick={()=>openCloseAll()}>{isOpen.performance && performanceMap}</div>
    </div>
  )
}
