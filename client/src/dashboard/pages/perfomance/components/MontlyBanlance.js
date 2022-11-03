import React from "react";

import UseFetchUserStock from '../../../API/useFetchUserStock'

import { Tooltip, Button } from '@mantine/core';


export default function Balance(props){
    // import user data and stovk data from holdings
    const { user , error, loaded } = UseFetchUserStock(props.jwt);
    const [PlDay, setPlDay] = React.useState(0);
    const [PlOpen, setPlOpen] = React.useState(0);
    
    const [Net, setNet] = React.useState(0);

   

    React.useEffect(() => {
        setPlDay(0)
        setPlOpen(0)
        setNet(0)
        

        props.array.map((stock)=>{
            setPlDay(prev=> prev+stock.dailyGain)
            
            setPlOpen(prev => prev+stock.Gain)
            setNet(prev =>prev+stock.Net)
           
    
        })
        
      }, [props]);




    
    return(
        <div className="balance">

            <ul>
                <li>
                <Tooltip label="Revenue per day">
                <p>P/L day</p>
                </Tooltip>
                <p>{PlDay.toFixed(2)}</p>

                </li>
                
                <li>
                <Tooltip label="Unrealized revenue ">

                <p>P/L open</p>
                </Tooltip>
                <p>{PlOpen.toFixed(2)}</p>
                    
                </li>
                <li>
                <Tooltip label="Unrealized worth">

                <p>Net Liq</p>
                </Tooltip>
                <p>{(Net + (user.avialableBalance? user.avialableBalance: 0)).toFixed(2)}</p>
                    
                </li>
                <li>
                <Tooltip label="Available balance">

                <p>Avialable $</p>
                </Tooltip>
                <p>{user.avialableBalance? (user.avialableBalance).toFixed(2) : "loading"}</p>

                    
               </li>
            </ul>
            
            



        </div>
    )



}