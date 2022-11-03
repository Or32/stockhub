import React from "react";
import { LoadingOverlay } from '@mantine/core';
import useFetchStock from "../../dashboard/API/useFetchStock";
import useFetchScore from "../../dashboard/API/useFetchScore";
import { NavLink } from 'react-router-dom';

export function Fetch(props){
  
    const {stock, error, loaded} = useFetchStock(props.ticker)

    
    
        

    
    const {score, error1, loaded1} = useFetchScore(props.ticker);
 
    
    return(
        !loaded? 
   
        <LoadingOverlay visible={false} overlayBlur={2} />
        
    :

          <tr className="tr">
              
              
            

       <td ><NavLink to="/Dashboard/search" onClick={() =>props.setsearch(props.ticker)}  style={{textDecoration: 'none', color: "white"}}>{props.ticker}</NavLink></td>
       <td className={Math.sign(stock.d)=== -1 ? "red":"green"}>{stock.d}$</td>
       <td className={Math.sign(stock.dp)=== -1 ? "red":"green"}>{stock.dp}%</td>
       <td >{stock.c ? stock.c : ""}$ </td>
       <td>{score ? score.letterScore: "NA"}</td>
 
 
     </tr>

      
    )





} 