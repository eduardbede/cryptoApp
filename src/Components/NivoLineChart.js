import React, {useEffect, useState} from 'react'
import { ResponsiveLine } from '@nivo/line'
import './NivoLineChart.css'
import useWindowDimensions from './useWindowDimensions';

export default function NivoLineChart({userId, option}) {
 const { height, width } = useWindowDimensions();
 const [data, setData] = useState(
        [
            {
                "id": "usa",
                "color": "157.29,80.09%,43.33%",
                "data":[{x:'',y:''}]
            }
        ]
    )
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

function finalPrice(final){
    return parseFloat(final).toLocaleString('en-US',{
        style: 'currency',
        currency: `${currency[option.currencyIndex].currency}`,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
        });
    };



function checkStatus(){
    fetch(`https://api.coingecko.com/api/v3/coins/${userId}/market_chart?vs_currency=${currency[option.currencyIndex].currency}&days=30&interval=daily`,
        requestOptions)
    .then(response => response.json())
    .then(res=>{ 
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];
        let dataLine = res.prices.map(el=>{
        let dateMonth = new Date(el[0]).getMonth();
        let dateDays = new Date(el[0]).getDate()
        const newDate = `${dateDays} ${monthNames[dateMonth]}`
                return {x:newDate, y:parseFloat(el[1])}
        })
        setData(prevData=>{
        return [{...prevData[0] ,data:dataLine}]})
}).catch(function(){
    console.log('404 Not Found');
    })
}

useEffect(()=>{
    checkStatus()
},[currency[option.currencyIndex].currency])


function tooltipCustom(node){
    return <div style={{ backgroundColor: 'white'}} 
                className='min-w-max min-h-max flex flex-col justify-center items-center p-1 font-bold'>
                <div>Date: {node?.point?.data?.x}</div>
                <div>Price: {finalPrice(node?.point?.data?.y)}</div>
            </div>  
    }

  return (
    <div className='nivoLineChart'>
        <ResponsiveLine
            data={data}
            margin={{ top: 100, right: 10, bottom: 50, left: 80 }}
            xScale={{ type: 'point' }}
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: true,
                reverse: false
            }}
            yFormat=" >-.2f"
            curve="monotoneX"
            axisTop={null}
            axisRight={null}
            axisBottom={width < 600 ? false : {
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: width < 768 ? -90 : -50,
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Price',
                legendOffset: -70,
                legendPosition: 'middle'
            }}
            colors={'green'}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={5}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            areaBaselineValue={100}
            useMesh={true}
            enableGridX={false}
            enablePoints={false}
            crosshairType='cross'
            areaOpacity={0.05}
            theme={{
                    "textColor": "#7B8196",
                    "fontSize": 12,
                    'fontFamily' : "Roboto",
                     'crosshair':{
                        line:{
                            stroke:"white"
                        }
                    }
                }}
            tooltip={( node ) => tooltipCustom(node)}
        />
    </div>
  )
}
