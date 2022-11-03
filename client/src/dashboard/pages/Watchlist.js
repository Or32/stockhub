import React from "react";
import { Table,MantineProvider } from '@mantine/core';
import useFetchUserWatchlist from "../API/useFetchUserWatchlst";
import { Fetch } from "./watchlistFetch";




export default function WatchList(props){

    const { list , error, loaded } = useFetchUserWatchlist(props.jwt);

    const [ array,setarray] = React.useState([])
   
 

   const HoldingsEllemnt = list.slice(1).map(function(stocks){
       

       
       
       return(
           <Fetch
           setsearch={props.setsearch}
           ticker={stocks.ticker}
           
           />

       )
   })


  

   return(
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
       <tr className="top">
         <th>ticker</th>
         <th>daily gain</th>
         <th>daily change</th>
         <th>price</th>
         <th>Scroe</th>

       </tr>
       
        <tbody >
           {list  ? HoldingsEllemnt : ""}
       </tbody>

       </Table>
       </MantineProvider>

   </div>
   )
}