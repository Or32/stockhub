import React from "react";
import { LoadingOverlay, Button, Group } from '@mantine/core';
import useFetchStock from "../../../API/useFetchStock";
import useFetchScore from "../../../API/useFetchScore";
import { NavLink } from 'react-router-dom';


export function Fetch(props){
  
    const {stock, error, loaded} = useFetchStock(props.ticker)

    const [once, setonce] = React.useState(false);
    
        

    
    const {score, error1, loaded1} = useFetchScore(props.ticker);
   
  
    
    React.useEffect(() => {
        
        if(!once && loaded){
            
            props.setarray(prev => [...prev,{dailyGain: stock.d, Gain:(stock.c* props.amount)-props.price,Net: props.price + ((stock.c* props.amount)-props.price)}])
            
            setonce(true);
        }
       
 
            

      }, [{loaded}]);
    
    return(
        !loaded? 
   
        <LoadingOverlay visible={false} overlayBlur={2} />
        
    :

          <tr className="tr" key={props.ticker} x={props.ticker}>
              
              
            

        <td ><NavLink to="/Dashboard/search" onClick={() =>props.setsearch(props.ticker)}  style={{textDecoration: 'none', color: "white"}}>{props.ticker}</NavLink></td>
       <td className={Math.sign(stock.d)=== -1 ? "red":"green"}>{stock.d}$</td>
       <td className={Math.sign(stock.dp)=== -1 ? "red":"green"}>{stock.dp? (stock.dp).toFixed(2): ""} %</td>
       <td >{stock.c ? stock.c : ""}$ </td>
       <td className={Math.sign((stock.c* props.amount-props.price))=== -1 ? "red":"green"}>{stock.c* props.amount/props.price ? (stock.c* props.amount-props.price).toFixed(2) : ""} $</td>
       <td>{props.amount}</td>
       <td>{(props.price).toFixed(2)}$</td>
       <td>{props.price/props.amount ? (props.price/props.amount).toFixed(2) :""}$</td>
       <td>{score ? score.letterScore: "NA"}</td>
 
 
     </tr>

      
    )





} 
