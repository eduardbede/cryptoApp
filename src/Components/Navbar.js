import { useState, useEffect, useRef } from "react"
import PerformanceComponent from "./PerformanceComponent"
import BlockSize from "./BlockSize"
import NumberOfCoin from "./NumberOfCoin"
import CurrencySelect from "./CurrencySelect"
import SelectListTree from "./SelectListTree"
import { HiOutlineMenuAlt2 } from "react-icons/hi";
/* import SearchCoin from "./SearchCoin" */
import "./NavBar.css"


export default function Navbar(props) {

  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const [open,setOpen]=useState({
                          performance:false,
                          block:false,
                          coins:false,
                          currency:false
                        })
  const [menuOpen, setMenuOpen] = useState(false)
 
useEffect(()=>{
  setWidth(ref.current.offsetWidth); 
  const getwidth = ()=>{
    setWidth(ref.current.offsetWidth);
    setMenuOpen(false)
  }
  window.addEventListener("resize", getwidth);
  return ()=>window.removeEventListener("resize", getwidth)
},[])


  function changePerformance(e){
    props.changePerformance(e)
    setMenuOpen(false)
  }

  function changeBlockSize(e){
    props.changeBlock(e)
    setMenuOpen(false)
  }

  function changeCoins(e){
    props.changeCoins(e)
    setMenuOpen(false)
  }

  function changeCurrency(e){
    props.changeCurrency(e)
    setMenuOpen(false)
  }

  function openClose(e){
    if(e === 'performance'){
      setOpen(prevOpen=>{
        return {
                performance:!prevOpen.performance,
                block:false,
                coins:false,
                currency:false
          }
      })
    }else if(e==="block"){
      setOpen(prevOpen=>{
        return {
                performance:false,
                block:!prevOpen.block,
                coins:false,
                currency:false
          }
      })
    }else if(e==="coins"){
      setOpen(prevOpen=>{
        return {
                performance:false,
                block:false,
                coins:!prevOpen.coins,
                currency:false
          }
      })
    }else if(e==="currency"){
      setOpen(prevOpen=>{
        return {
                performance:false,
                block:false,
                coins:false,
                currency:!prevOpen.currency
          }
      })
    }
  }

  function openCloseAll(){
    
    setOpen(()=>{
      return {
              performance:false,
              block:false,
              coins:false,
              currency:false
        }
    })
  }
  
  function stopProp(e){
    e.stopPropagation()
    setMenuOpen(false)
    openCloseAll()
  }

  function menuTrueFalse(e){
    e.stopPropagation()
    setMenuOpen(prevOpen=>!prevOpen)
    openCloseAll()
  }

  return (
    <nav className='navBlock' onClick={(e)=>stopProp(e)} ref={ref}>
      {width > 790 ? <div className="navBlockLeft">
      {!props.listTree && <PerformanceComponent option={props.option.performance}
                            changePerformance={changePerformance} 
                            isOpen={open} 
                            openClose={openClose}
                            openCloseAll={openCloseAll}/>}
        {!props.listTree && <BlockSize option={props.option.block}
                              changeBlockSize={changeBlockSize} 
                              isOpen={open} 
                              openClose={openClose}
                              openCloseAll={openCloseAll} />}
          
        {!props.listTree && <NumberOfCoin option={props.option.coinLimit}
                              changeCoins={changeCoins} 
                              isOpen={open} 
                              openClose={openClose}
                              openCloseAll={openCloseAll} />}
          
          <CurrencySelect option={props.option.currencyIndex}
                          changeCurrency={changeCurrency} 
                          isOpen={open} 
                          openClose={openClose}
                          openCloseAll={openCloseAll} />
      </div> : <div className="buttonDivHidden" onClick={(e)=>menuTrueFalse(e)}><HiOutlineMenuAlt2  /></div> }
      {(menuOpen && width <= 790) && 
        <div className="hiddenWidth" >
        {!props.listTree && <PerformanceComponent option={props.option.performance}
                            changePerformance={changePerformance} 
                            isOpen={open} 
                            openClose={openClose}
                            openCloseAll={openCloseAll}/>}
        {!props.listTree && <BlockSize option={props.option.block}
                              changeBlockSize={changeBlockSize} 
                              isOpen={open} 
                              openClose={openClose}
                              openCloseAll={openCloseAll} />}
          
        {!props.listTree && <NumberOfCoin option={props.option.coinLimit}
                              changeCoins={changeCoins} 
                              isOpen={open} 
                              openClose={openClose}
                              openCloseAll={openCloseAll} />}
          
          <CurrencySelect option={props.option.currencyIndex}
                          changeCurrency={changeCurrency} 
                          isOpen={open} 
                          openClose={openClose}
                          openCloseAll={openCloseAll} />
        </div>}
      <div className='navRight'>
          {/* <div>
            <SearchCoin />
          </div> */}
          <div className="navBlockRight">
            <SelectListTree listTree={props.listTree}
                            changeView={props.changeView} />
          </div>
      </div>
          
    </nav>
  )
}
