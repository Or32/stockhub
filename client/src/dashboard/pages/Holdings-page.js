import React from "react";
import { Table,MantineProvider } from '@mantine/core';
import useFetchUserHoldings from '../../dashboard/API/useFetchUserHoldings'
import {Fetch} from './perfomance/components/Fetch'


export default function HoldingsPage(props){

    const { user , error, loaded } = useFetchUserHoldings(props.jwt);

    //const [gain, setgain] = React.useState([]);
    const [ array,setarray] = React.useState([])
   
 

   const HoldingsEllemnt = user.slice(1).map(function(stocks){
       

       
       
       return(
           <Fetch
           setsearch={props.setsearch}
           setarray={setarray}
           array={array}
           
           ticker={stocks.ticker}
           amount={stocks.amount}
           price={stocks.price}
           />

       )
   })


  

   return(
       !loaded?
       <div className="holdingspage"></div>
       :
   <div className="holdingspage">

       
       
       <MantineProvider theme={{
        colorScheme: 'dark',
        colors: {
          // override dark colors to change them for all components
          dark: [
            '#d5d7e0',
            '#acaebf',
            '#8c8fa3',
            '#666980',
            '#4d4f66',
            '#34354a',
            '#2b2c3d',
            '#1d1e30',
            '#0c0d21',
            '#01010a',
          ],
        },
      }}
>
       <Table highlightOnHover={true} verticalSpacing="sm" >
       <tr>
       <th>ticker</th>
         <th>daily gain</th>
         <th>daily change</th>
         <th>price</th>
         <th> gain</th>
         <th>amount</th>
         <th>amount invested</th>
         <th>Avg cost</th>
         <th>Scroe</th>

       </tr>
       
        <tbody >
           {user  ? HoldingsEllemnt : ""}
       </tbody>

       </Table>
       </MantineProvider>

   </div>
   )
}