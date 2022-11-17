import React from 'react'

export default function FetchData() {

/* let da = 0.00053123

function changeFix(res){
    let fix = 2
    function test(){
            for(let i = 2; i < 5; i++){
                if(String(res.toFixed(fix)).slice(-2) === '00'){
                    fix = fix + 3
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
} */
    
    



/* function truncateToDecimals(res) {
    let dec = 2
    const calcDec = Math.pow(10, dec);
    function test(){
        for(let i = 2; i < 5; i++){
            if(String(res.toFixed(dec)).slice(-2) === '00'){
                dec = dec+1
            }
    }
  }
  test()
  return Math.trunc(res * calcDec) / calcDec;
}
  
  console.log(truncateToDecimals(da)) */

 



  return (


    <div>FetchData</div>
  )
}
