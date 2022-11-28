import React,{useEffect, useState} from 'react'
import NivoLineChart from './NivoLineChart'
import { useParams } from 'react-router-dom'
import ErrorPage from './ErrorPage'
import { Interweave } from 'interweave';
import './CoinPage.css'
import useWindowDimensions from './useWindowDimensions';

export default function CoinPage({option}) {
    const { height, width } = useWindowDimensions();
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
    },[userId])

return (
    <div>
       {status ? <ErrorPage /> :
       <div className='all-CoinDiv'>
        <NivoLineChart userId={userId} option={option} />
            <div className='flex gap-2 text-Color m-5 justify-center'>
            <img src={dataCoin[0]?.image.large} alt={dataCoin[0]?.image.small} width='80px'></img>
                <div className='flex flex-col text-3xl'>
                    <span>{dataCoin[0]?.symbol.toUpperCase()}</span>
                    <span>{dataCoin[0]?.name}</span>
                </div>
            </div>
            <div className='text-Div m-0 p-5 text-Color'>{<Interweave content={dataCoin[0]?.description.en} />}</div>
       </div>}

    </div>
  )
}
