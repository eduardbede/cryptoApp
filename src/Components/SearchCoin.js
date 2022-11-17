import React, {useState, useEffect, useRef} from 'react'
import './SearchCoin.css'


export default function SearchCoin() {

  /*   function filterSearch(e){
        e.preventDefault()
        setSearchCoin(inputEl.current.value)
        console.log(inputEl.current.value)
        inputEl.current.value = ''
  } */


  return (
    <div className='inputSearch'>
        <label className='labelSearch'>Search Coin:</label>
        <input></input>
    </div>
  )
}
