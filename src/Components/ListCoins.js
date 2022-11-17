import React, { useEffect, useState } from 'react'
import downArrow from '../../src/Img/arrow_down_icon.png'
import upArrow from '../../src/Img/arrow_up_icon.png'
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";

import "./ListCoins.css"

export default function ListCoins({setLocation ,option}) {
  
  const [dataList, setDataList] = useState([]);
  const [sort, setSort] = useState({
                                   fetch: 'asc',
                                   arraySort: 'desc'
                                  });
  const [sortBy, setSortBy] = useState('market_cap_rank')
  const [timp, setTimp] = useState(0);
  const [noOfPage, setNoOfPage] = useState(1);
  const [allSort, setAllSort] = useState({})

  const currency = [
    {currency: 'USD', symbol:"$"},
    {currency: 'EUR', symbol:"€"},
    {currency: 'GBP', symbol:"£"},
    {currency: 'AUD', symbol:"A$"},
    {currency: 'CAD', symbol:"CA$"},
    {currency: 'CNY', symbol:"¥"},
    {currency: 'JPY', symbol:"¥"},
  ]
  
  let requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  

  useEffect(()=>{
    setLocation()
      fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency[option.currencyIndex].currency}&order=market_cap_desc&per_page=100&page=${noOfPage}&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C30d%2C1y`,
           requestOptions)
      .then(response => response.json())
      .then(result => {
        sortArrayFetch(sortBy, result)
      })

          /*   const time = setTimeout(()=>{
              console.log('work?')
              setTimp(prevState=>{
                return prevState+1
              })
          },60000)
        return ()=>{
          clearTimeout(time)
        } */
        
  },[timp, noOfPage, option.currencyIndex])

  function sortArrayFetch(el, res){
    if(sort.fetch === 'desc'){
      setDataList(res?.sort((a,b)=>{
        if(typeof a[el] === 'number' || typeof a[el] === 'object'){
          return a[el] < b[el] ? 1 : -1
        }else{
          return a[el].toLowerCase() < b[el].toLowerCase() ? 1 : -1
        }
      }));
    }else if(sort.fetch === 'asc'){
      setDataList(res?.sort((a,b)=>{
        if(typeof a[el] === 'number' || typeof a[el] === 'object'){
          return a[el] > b[el] ? 1 : -1
        }else{
         return a[el].toLowerCase() > b[el].toLowerCase() ? 1 : -1
        }
      }));
    }
}
 

  function transformToLocaleTwo(el){
    if(Number.isNaN(el) === true) return '?'
    return el.toLocaleString('en-US')
   }

  function changeFix(res){
    if(res === "") return "?"
    let fix = 3
    function test(){
            for(let i = 2; i < 20; i++){
                if(String(res?.toFixed(fix)).slice(-2) === '00'){
                    fix = fix + 5
                }
        }
        let toFixed = function(input, decimals) {
           let arr = ("" + input).split(".");
            if (arr.length === 1) return input;
              let int = arr[0],
                  max = arr[1].length,
                  dec = arr[1].slice(0, decimals > max ? max : decimals);
            return decimals === 0 ? int : [int, "." , dec].join("");
          }
         return toFixed(res, fix)
    }
   return test()
}

function finalPrice(final){
 return parseFloat(changeFix(final)).toLocaleString('en-US',{
    style: 'currency',
    currency: `${currency[option.currencyIndex].currency}`,
    minimumFractionDigits: 2,
    maximumFractionDigits: 10
  });
};

function sortArrayNumber(el){
  if(sort.arraySort === 'asc'){
    setDataList([...dataList]?.sort((a,b)=> {
      if(typeof a[el] === 'number' || typeof a[el] === 'object'){
        return a[el] < b[el] ? 1 : -1
      } else{
        return a[el].toLowerCase() < b[el].toLowerCase() ? 1 : -1
      }
    }));
    setSort({fetch:'desc',arraySort:'desc'});
  }else if(sort.arraySort === 'desc'){
    setDataList([...dataList]?.sort((a,b)=>{
      if(typeof a[el] === 'number' || typeof a[el] === 'object'){
        return a[el] > b[el] ? 1 : -1
      }
        return a[el].toLowerCase() > b[el].toLowerCase() ? 1 : -1
    }));
    setSort({fetch:'asc',arraySort:'asc'});
  }
  setSortBy(el) 
}

function upOrDownIndicator(element){
  if(element > 0){
    return <AiFillCaretUp />
  }else if(element === 0){
    return <AiFillCaretUp />
  }else if(element < 0){
    return <AiFillCaretDown />
  }
}

function colorOfTable(element){
  if(element > 0){
    return "#16A972"
  }else if(element === 0){
    return "#FCFAFC"
  }else if(element < 0){
    return "#EA3943"
  }
}

function sortIndicator(e){
  console.log(e.target.id)
  /* e.stopPropagation() */
  if(e.target.id === 'market_cap'){
    console.log(e.target.id)
    if(sort.arraySort === 'asc'){
      setAllSort({market_cap: upArrow})
    }else if(sort.arraySort === 'desc'){
      setAllSort({market_cap: downArrow })
    }else{
      setAllSort({market_cap: ''})
    }
  }else if(e.target.id === 'name'){
    if(sort.arraySort === 'asc'){
      setAllSort({name: downArrow})
    }else if(sort.arraySort === 'desc'){
      setAllSort({name: upArrow })
    }else{
      setAllSort({name: ''})
    }
  }else if(e.target.id === 'symbol'){
    if(sort.arraySort === 'asc'){
      setAllSort({symbol: downArrow})
    }else if(sort.arraySort === 'desc'){
      setAllSort({symbol: upArrow })
    }else{
      setAllSort({symbol: ''})
    }
  }else if(e.target.id === 'currentPrice'){
    if(sort.arraySort === 'asc'){
      setAllSort({currentPrice: downArrow})
    }else if(sort.arraySort === 'desc'){
      setAllSort({currentPrice: upArrow })
    }else{
      setAllSort({currentPrice: ''})
    }
  }else if(e.target.id === 'percentage1h'){
    if(sort.arraySort === 'asc'){
      setAllSort({percentage1h: downArrow })
    }else if(sort.arraySort === 'desc'){
      setAllSort({percentage1h: upArrow })
    }else{
      setAllSort({percentage1h: ''})
    }
  }else if(e.target.id === 'percentage24h'){
    if(sort.arraySort === 'asc'){
      setAllSort({percentage24h: downArrow })
    }else if(sort.arraySort === 'desc'){
      setAllSort({percentage24h: upArrow })
    }else{
      setAllSort({percentage24h: ''})
    }
  }else if(e.target.id === 'percentage7d'){
    if(sort.arraySort === 'asc'){
      setAllSort({percentage7d: downArrow })
    }else if(sort.arraySort === 'desc'){
      setAllSort({percentage7d: upArrow })
    }else{
      setAllSort({percentage7d: ''})
    }
  }else if(e.target.id === 'market_cap1'){
    if(sort.arraySort === 'asc'){
      setAllSort({market_cap1: downArrow })
    }else if(sort.arraySort === 'desc'){
      setAllSort({market_cap1: upArrow })
    }else{
      setAllSort({market_cap1: ''})
    }
  }else if(e.target.id === 'total_volume'){
    if(sort.arraySort === 'asc'){
      setAllSort({total_volume: downArrow })
    }else if(sort.arraySort === 'desc'){
      setAllSort({total_volume: upArrow })
    }else{
      setAllSort({total_volume: ''})
    }
  }else if(e.target.id === 'total_supply'){
    if(sort.arraySort === 'asc'){
      setAllSort({total_supply: downArrow })
    }else if(sort.arraySort === 'desc'){
      setAllSort({total_supply: upArrow })
    }else{
      setAllSort({total_supply: ''})
    }
  }
}


const data = dataList?.map(el=>{
     return <tr key={el?.id} className='tableTr'>
              <td className='sticky'>{el?.market_cap_rank}</td>
              {/* <td className='sticky'>
               <Link to={el?.id}> <div className='nameImgDiv'>
                        <img className='imgTable' src={el?.image} alt={el?.image}></img>
                        <div>{el?.name}</div>
                      </div>
               </Link>
              </td> */}
              <td className='sticky'>
                <div className='nameImgDiv'>
                        <img className='imgTable' src={el?.image} alt={el?.image}></img>
                        <div>{el?.name}</div>
                 </div>
              </td>
              <td>{el.symbol?.toUpperCase()}</td>
              <td>{finalPrice(el?.current_price)}</td>
              <td  
                  style={{color:colorOfTable(el?.price_change_percentage_1h_in_currency)}}>
                    <span className='tdFlexDisplay'>
                      {upOrDownIndicator(el?.price_change_percentage_1h_in_currency)}
                      {el?.price_change_percentage_1h_in_currency?.toFixed(2)}%
                    </span>
                    </td>
              <td style={{color:colorOfTable(el?.price_change_percentage_24h)}}>
                    <span className='tdFlexDisplay' >
                      {upOrDownIndicator(el?.price_change_percentage_24h)}
                      {el?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                    </td>
              <td style={{color:colorOfTable(el?.price_change_percentage_7d_in_currency)}}>
                      <span className='tdFlexDisplay' >
                        {upOrDownIndicator(el?.price_change_percentage_7d_in_currency)}
                        {el?.price_change_percentage_7d_in_currency?.toFixed(2)}%
                      </span>
                    </td>
              <td>{finalPrice(el?.market_cap)}</td>
              <td>{finalPrice(el?.total_volume)}</td>
              <td>{transformToLocaleTwo(parseFloat(changeFix(el?.total_supply)))}</td>
            </tr>
})

const load = <div className="container">
                    <svg className="loader" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 340">
                      <circle cx="170" cy="170" r="160" stroke="#E2007C"/>
                      <circle cx="170" cy="170" r="135" stroke="#404041"/>
                      <circle cx="170" cy="170" r="110" stroke="#E2007C"/>
                      <circle cx="170" cy="170" r="85" stroke="#404041"/>
                    </svg>
                  </div>

  return (
   <div>
    <div id='style-2' className="wrapper" >
      {data.length !== 0  && 
        <div className='buttonsNextPrev'>
          {noOfPage > 1 && <button className='buttonPrev' onClick={()=>setNoOfPage(prev=>prev - 1)} >PREV 100 </button>} 
          {noOfPage < 30 && <button className='buttonNext' onClick={()=>setNoOfPage(prev=>prev + 1)} >NEXT 100 </button>} 
        </div>}
      {data.length === 0 ? load : <table className='tableList'>
        <tbody>
          <tr className='tableTr stickyTable'>
              <td className='sticky tdPointer' id='market_cap' onClick={(e)=>{sortArrayNumber('market_cap'); sortIndicator(e)}}>
                <div className='namesDivv' id='market_cap'>
                  <div id='market_cap'>#</div>
                  <img src={allSort?.market_cap} id='market_cap' alt='' width={'18px'}></img>
                </div>
              </td>
              <td className='sticky sticky2 tdPointer' id='name' onClick={(e)=>{sortArrayNumber('name'); sortIndicator(e)}}>
                <div className='namesDivv' id='name'>
                  <div id='name'>Name</div>
                  <img src={allSort?.name} id='name' alt='' width={'18px'}></img>
                </div>
              </td>
              <td className='tdPointer' id='symbol' onClick={(e)=>{sortArrayNumber('symbol'); sortIndicator(e)}} >
                <div className='namesDivv' id='symbol'>
                  <div id='symbol'>Symbol</div>
                  <img src={allSort?.symbol} id='symbol' alt='' width={'18px'}></img>
                </div>
              </td>
              <td className='tdPointer' id='currentPrice' onClick={(e)=>{sortArrayNumber('current_price'); sortIndicator(e)}} >
                <div className='namesDivv' id='currentPrice'>
                  <div id='currentPrice'>Price</div>
                  <img src={allSort?.currentPrice} id='currentPrice' alt='' width={'18px'}></img>
                </div>
              </td>
              <td className='tdPointer' id='percentage1h' onClick={(e)=>{sortArrayNumber('price_change_percentage_1h_in_currency'); sortIndicator(e)}} >
                <div className='namesDivv' id='percentage1h'>
                  <div id='percentage1h'>Price 1h</div>
                  <img src={allSort?.percentage1h} id='percentage1h' alt='' width={'18px'}></img>
                </div>
              </td>
              <td className='tdPointer' id='percentage24h' onClick={(e)=>{sortArrayNumber('price_change_percentage_24h'); sortIndicator(e)}} >
                <div className='namesDivv' id='percentage24h'>
                  <div id='percentage24h'>Price 24h</div>
                  <img src={allSort?.percentage24h} id='percentage24h' alt='' width={'18px'}></img>
                </div>
              </td>
              <td className='tdPointer' id='percentage7d' onClick={(e)=>{sortArrayNumber('price_change_percentage_7d_in_currency'); sortIndicator(e)}}>
                <div className='namesDivv' id='percentage7d'>
                  <div id='percentage7d'>Price 7d</div>
                  <img src={allSort?.percentage7d} id='percentage7d' alt='' width={'18px'}></img>
                </div>
              </td>
              <td className='tdPointer' id='market_cap1' onClick={(e)=>{sortArrayNumber('market_cap'); sortIndicator(e)}} >
               <div className='namesDivv' id='market_cap1'>
                  <div id='market_cap1'>Market Cap</div>
                  <img src={allSort?.market_cap1} id='market_cap1' alt='' width={'18px'}></img>
                </div>
              </td>
              <td className='tdPointer' id='total_volume' onClick={(e)=>{sortArrayNumber('total_volume'); sortIndicator(e)}} >
                <div className='namesDivv' id='total_volume'>
                  <div id='total_volume'>Volume 24h</div>
                  <img src={allSort.total_volume} id='total_volume' alt='' width={'18px'}></img>
                </div>
              </td>
              <td className='tdPointer' id='total_supply' onClick={(e)=>{sortArrayNumber('total_supply'); sortIndicator(e)}} >
               <div className='namesDivv' id='total_supply'>
                  <div id='total_supply'>Supply</div>
                  <img src={allSort.total_supply} id='total_supply' alt='' width={'18px'}></img>
                </div>
              </td>
          </tr>
          {data}
        </tbody>
        </table>}
        {data.length !== 0  && 
        <div className='buttonsNextPrev'>
          {noOfPage > 1 && <button className='buttonPrev' onClick={()=>setNoOfPage(prev=>prev - 1)} >PREV 100 </button>} 
          {noOfPage < 30 && <button className='buttonNext' onClick={()=>setNoOfPage(prev=>prev + 1)} >NEXT 100 </button>} 
        </div>}
      </div>
  </div>
    )
}
