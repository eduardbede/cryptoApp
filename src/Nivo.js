import React from 'react'
import { useEffect, useState } from 'react'
import { ResponsiveTreeMapHtml } from '@nivo/treemap'
import './Components/loading.scss'

export default function Nivo(props) {
  const [treeMap, setTreeMap] = useState({'children':[]})
  const [timp, setTimp] = useState(0)


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

  /* useEffect(()=>{
    setTreeMap({children:[]})
      fetch(`https://api.coinstats.app/public/v1/coins?skip=0&limit=${props.option.coinLimit}
      &currency=${currency[props.option.currencyIndex].currency}`,
       requestOptions)
      .then(response => response.json())
      .then(result => {result.coins?.map((el)=>{
          const performance =[el.priceChange1h, el.priceChange1d, el.priceChange1w, el.marketCap]
          const blockSize = [el.marketCap,el.volume, el.priceChange1h, el.priceChange1d, el.priceChange1w]
                      return setTreeMap(prevProps=>{
                          return {'children':[...prevProps.children, {
                            "name": el.symbol,
                            "color": performance[props.option.option] >= 0 ? "#90EE90" : '#FA8072',
                            "loc": Math.abs(blockSize[props.option.block]),
                            "realValue": performance[props.option.option],
                            "img": el.icon,
                            "price": parseFloat(changeFix(el.price)).toLocaleString('en-US',{
                              style: 'currency',
                              currency: `${currency[props.option.currencyIndex].currency}`,
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 10

                            })
                          }]}
                        })
                      })            
                    })
      .catch(error => console.log('error', error));  */
      
        /* const time = setTimeout(()=>{
            setTimp(prevState=>{
              return prevState+1
            })
        },60000)
      return ()=>{
        clearTimeout(time)
      } */

   /* },[timp, props.option]) */


   function color(param){
    if(param > 0){
      if(param >= 5){
        return "#518651"
      } else{
        return "#7EC17E"
      }
    }else if(param < 0){
      if(param <= -5){
        return "#aa2121"
      }else{
        return  '#FA8072'
      }
    }else if(param === 0 || param === null){
      return "#BCB2B1"
    }
   }

   useEffect(()=>{
    setTreeMap({children:[]})
      fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency[props.option.currencyIndex].currency}&order=market_cap_desc&per_page=${props.option.coinLimit}&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C30d%2C1y`,
       requestOptions)
      .then(response => response.json())
      .then(result => {result.map(el=>{
        const performance =[
                            el?.price_change_percentage_1h_in_currency,
                            el?.price_change_percentage_24h_in_currency,
                            el?.price_change_percentage_7d_in_currency,
                            el?.price_change_percentage_30d_in_currency,
                            el?.price_change_percentage_1y_in_currency,
                           ]
          const blockSize = [
                             el?.market_cap,
                             el?.total_volume, 
                             el.price_change_percentage_1h_in_currency, 
                             el.price_change_percentage_24h_in_currency, 
                             el.price_change_percentage_7d_in_currency,
                            ]
            return setTreeMap(prevProps=>{
              return {'children':[...prevProps.children, {
                "name": el?.symbol.toUpperCase() ,
                "color": /* performance[props.option.option] >= 0 ? "#90EE90" : '#FA8072', */ color(performance[props.option.performance]),
                "loc": Math.abs(blockSize[props.option.block]),
                "realValue": /* changeFix( */performance[props.option.performance]?.toFixed(2),
                "img": el.image,
                "price": parseFloat(changeFix(el.current_price)).toLocaleString('en-US',{
                  style: 'currency',
                  currency: `${currency[props.option.currencyIndex]?.currency}`,
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 10
                }).toString()
              }]}
            })
      })  
                    })
      .catch(error => console.log('error', error)); 

      const time = setInterval(()=>{
        setTimp(prevState=>{
          return prevState+1
        })
    },60000)
  return ()=>{
    clearTimeout(time)
  }

   },[timp, props.option])

  

   function changeFix(res){
    let fix = 4
    function test(){
            for(let i = 2; i < 10; i++){
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


    function tooltipCustom(node){
      return <div style={{ backgroundColor: 'white'}} 
                  className='min-w-max min-h-max flex justify-center items-center p-1 font-bold'>
                    <img src={node.data.img} className='imgDiv mr-1' alt={''}></img> 
                  {node?.data?.name} {node.data.realValue !== null && `${node?.data?.realValue}%` } {node?.data?.price}
              </div>
    }

    const load = <div className="container">
                    <svg className="loader" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 340">
                      <circle cx="170" cy="170" r="160" stroke="#E2007C"/>
                      <circle cx="170" cy="170" r="135" stroke="#404041"/>
                      <circle cx="170" cy="170" r="110" stroke="#E2007C"/>
                      <circle cx="170" cy="170" r="85" stroke="#404041"/>
                    </svg>
                  </div>
  
  return (
    <div className='screenMap overflow-hidden'>
       <ResponsiveTreeMapHtml
            data={treeMap}
            identity="name"
            value="loc"
            valueFormat=".02s"
            leavesOnly={true}
            colors={({ data }) =>{return data?.color}}
            margin={{/* top: 10, */ bottom: 0, left:5, right:5 }}
            labelSkipSize={40}
            motionConfig='stiff'
            tile='binary'
            nodeOpacity={0.8}
            orientLabel={false}
            theme={{
                fontFamily: 'Roboto',
              }}
            label={node=>{return node.data.realValue === undefined ? <div className='loadingDiv'>{load}</div> :
                   <svg viewBox="0 0 56 18" className='svgClass '>
                    <text className='textSvg' > 
                      <tspan className='tSpanClass' x="50%" dy='5.5px' textAnchor="middle" alignmentBaseline="middle">{node?.data?.name}</tspan>
                      <tspan className='tspanPercentage' x='50%' dy="5.5px" textAnchor="middle" alignmentBaseline="middle">{node.data.realValue !== null && `${node?.data?.realValue}%`}</tspan>
                      <tspan className='tspanPrice' x="50%" dy="4.5px" textAnchor="middle" alignmentBaseline="middle">{node?.data?.price}</tspan>
                    </text>
                  </svg>
                                  }}
               
            tooltip={({ node }) => node.data.realValue !== undefined ? tooltipCustom(node) : <div></div>}
            borderWidth='0'
            labelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        3
                    ]
                ]
            }} 
        />
    </div>
  )
}
