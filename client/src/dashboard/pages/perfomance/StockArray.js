import React from "react";


export default function StockArray(stockArray, setdStockArray){

     const addObjectToArray = obj => {
        setdStockArray(current => [...current, obj]);
      };

     addObjectToArray({ id: Math.random(),
        name: 'Carl',
        country: 'Canada',})



        console.error(stockArray)

    
}