import React, { useEffect } from 'react'
import { useState } from 'react'
import Nivo from './Nivo'
import Navbar from './Components/Navbar'
import GlobalData from './Components/GlobalData'
import ListCoins from './Components/ListCoins'
import ErrorPage from './Components/ErrorPage'
import CoinPage from './Components/CoinPage'
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'

export default function App(){
  const [option, setOption] =  useState({
                                        performance:0,
                                        block:0,
                                        coinLimit:20,
                                        currencyIndex:0
                                      })

  const [listTree, setListTree] = useState(JSON.parse(localStorage.getItem('listTree')) || false);
  const location = useLocation();

  function setLocation(){
    if(location.pathname === '/'){
      setListTree(false)
    }
        localStorage.setItem("listTree", JSON.stringify(listTree));
  }

  useEffect(()=>{
    setLocation()
  },[listTree, location.pathname])


  function changePerformance(el){
    if(el === option.performance) return
    setOption(prevProps=>{
      return {...prevProps, performance:el}
    })
  }
  function changeBlock(el){
    if(el === option.block) return
    setOption(prevProps=>{
      return {...prevProps, block:el}
    })
  }
  function changeCoins(el){
    if(el === option.coinLimit) return
    setOption(prevProps=>{
      return {...prevProps, coinLimit:el}
    })
  }
  function changeCurrency(el){
    if(el === option.currencyIndex) return
    setOption(prevProps=>{
      return {...prevProps, currencyIndex:el}
    })
  }

  function changeView(){
    setListTree(prevProps=>{
      return !prevProps
    })
  }

  function changeViewFalse(){
    setListTree(true)
  }

  return (
        <div className='allColor'>
          <div className={`backGround, ${listTree === false ? "h-screen" : ''}`}>
            <GlobalData />
            <Navbar option={option}
                    changePerformance={changePerformance}
                    changeBlock={changeBlock}
                    changeCoins={changeCoins}
                    changeCurrency={changeCurrency}
                    listTree={listTree}
                    changeView={changeView} 
                    changeViewFalse={changeViewFalse}
                    />

                  <Routes>
                      <Route path="/" element={<Nivo option={option} />} />
                      <Route path="/currencies" element={<ListCoins setLocation={setLocation} option={option} />} />
                      <Route path="/currencies/:userId" element={<CoinPage option={option}/>} />
                      <Route path='/:userId' element={<CoinPage option={option} />} />
                      <Route path="*" element={<ErrorPage />} />
                  </Routes>
                  
              {/* {!listTree && <div className='noOverflow'>
                              <Nivo option={option} />
                            </div>  } */}
          </div>
          {/* {listTree && <div className='backGround allTableDiv'>
                          <ListCoins />
                        </div> } */}
                        {/* {listTree && 
                          <ListCoins />} */}
        </div>
  )
}
