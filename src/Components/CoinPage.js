import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import ErrorPage from './ErrorPage'

export default function CoinPage() {

    const [status, setStatus] = useState(false)
    const [dataCoin, setDataCoin] = useState([])

    let { userId  } = useParams();

let requestOptions = {
    method: 'GET',
    redirect: 'follow'
    };

function checkStatus(){
    fetch(`https://api.coingecko.com/api/v3/coins/${userId}`,
        requestOptions)
    .then(response => response.json())
    .then(res=>{
        if(res.error !== undefined){
            setStatus(true)
        }else{
           setDataCoin([res])
        }
}).catch(function(){
    console.log('404 Not Found');
  })
}

    useEffect(()=>{
        checkStatus()
    },[])

    console.log(dataCoin)
    
return (
    <div>
        {status ?  <ErrorPage /> : <div>{userId}</div>}
    </div>
  )
}
