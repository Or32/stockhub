
import React from "react";

export default function FinanceTab(props){


const finance1 = props.finance.bs.slice(0,15).map(data=>(
    <li>
        <p> {data.label} :         <span> {data.value.toLocaleString("en-US")} $</span> </p>

    </li>
))
const finance2 = props.finance.cf.slice(0,15).map(data=>(
    <li>
        <p> {data.label} :  <span>{data.value.toLocaleString("en-US")} $ </span></p>

    </li>
))
const finance3 = props.finance.ic.slice(0,15).map(data=>(
    <li>
        <p> {data.label} : <span>{data.value.toLocaleString("en-US")} $ </span></p>

    </li>
))

    return(
        <div className="finance-tab">

           <ul>
               {finance1}
           </ul>
           <ul>
               {finance2}
           </ul>
           <ul>
               {finance3}
           </ul>
            
        </div>
    )




}