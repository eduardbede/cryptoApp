import React, {useState, useEffect} from 'react'
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useLocation } from 'react-router-dom';
import './SearchCoin.css'

export default function SearchCoin({changeViewFalse}) {
  const location = useLocation();
 
  const [search, setSearch] = useState(false)
  const [searchCoin, setSearchCoin ] = useState('')
  const [dataCoin, setDataCoin] = useState([])

  useEffect(()=>{
    if(search === true){
      document.body.classList.add("noOverFlow")
    }else{
      document.body.classList.remove('noOverFlow')
    }
    locationPath()
  },[search])

  useEffect(()=>{
    locationPath()
    const getData = setTimeout(() => {
      fetch(`https://api.coingecko.com/api/v3/search?query=${searchCoin}`)
      .then((response) => response.json())
      .then(data=>{
        setDataCoin(data.coins.slice(0, 10))
      })
    }, 700)
    return () => clearTimeout(getData)
  },[searchCoin])

  function locationPath(){
    if(location.pathname !== '/'){
      changeViewFalse()
    }
  }

 const mappedCoinsList = dataCoin.map(el=>{
    return <div key={el?.id} >
              <Link to={el?.id} onClick={()=>{setSearch(false); setSearchCoin('')}} >
                  <div className='map-DivCoins'>
                    <img src={el?.large} alt={el.thumb}></img>
                    <div className='text-DivCoins'>{el?.name}</div>
                  </div>
              </Link>
           </div>
 })

  return (
    <>
      {search ? <div className='searchAllDiv'>
                  <div className='flex justify-center pt-10 gap-5'>
                    <AiOutlineSearch size={30} color="white"/>
                    <input className='inputSearchCoin' onChange={(e)=>{setSearchCoin(e.target.value)}} value={searchCoin} placeholder={`Search Coin`}></input>
                    <button onClick={()=>setSearch(prevSearch=>!prevSearch)} className='buttonClass'>Cancel</button>
                    <div className='mappedCoins'>{dataCoin.length !== 0 ? mappedCoinsList : <div className='map-DivCoins'>No Result</div>}</div>
                  </div>
                </div> : 
                  <div className='searchSimple'>
                    <AiOutlineSearch size={30} color="white" onClick={()=>setSearch(prevSearch=>!prevSearch)} style={{cursor:'pointer'}}/>
                  </div>  }
    </>
   
  )
}
