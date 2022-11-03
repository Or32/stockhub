import React,{useState} from "react";
import './performance.css'
import Market from "./components/Market";
import Holdings from "./components/holdings";
import Allocation from "./components/Allocation";

import { LoadingOverlay} from '@mantine/core';


import Card from "./components/cards";
import useFetchUserHoldings from "../../API/useFetchUserHoldings";
import Balance from "./components/MontlyBanlance";






export default function Perfomance(props){

    const { user , error, loaded } = useFetchUserHoldings(props.jwt);
   
    
    
    const [ array,setarray] = React.useState([])
   

  

    return(

        <div className="performance">

            <div className="left">
                <Market/>
                <div >{!loaded ? <LoadingOverlay visible={true} overlayBlur={2} />: <Holdings holding={user} array={array}  setarray={setarray} jwt={props.jwt}  setsearch={props.setsearch}/>}</div>

            </div>

            <div className="right">
            <Card jwt={props.jwt}/>
            <Allocation user={user} jwt={props.jwt}/>
            <Balance array={array? array: ''} jwt={props.jwt}/>
            


            </div>
            

        </div>
    )
}