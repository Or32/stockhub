import React from "react";
import visa from "./cards-img/Subtract.svg";
import subtract from "./cards-img/Visa.svg";
import chip from "./cards-img/Chip.svg";


import card1 from "./cards-img/card1.svg";
import card2 from "./cards-img/card2.svg";
import card3 from "./cards-img/card3.svg";
import card4 from "./cards-img/card4.svg";
import card5 from "./cards-img/card5.svg";
import card6 from "./cards-img/card6.svg";
import card7 from "./cards-img/card7.svg";
import card8 from "./cards-img/card8.svg";
import UseFetchUserStock from '../../../API/useFetchUserStock'
import UseFetchUserDetails from "../../../API/useFetchUserDetails";















export default function Card(props){
    
    
    const { user , error, loaded } = UseFetchUserStock(props.jwt);
    const { name } = UseFetchUserDetails(props.jwt);
    const [random,setrandom] = React.useState()

    
    
    
    const cards =[card1,card2,card3,card4,card5,card6,card7,card8]
     React.useEffect(()=>{
        setrandom(Math.floor(Math.random() * 8)+1);

     },[])
    

    return(
        <div className="card"  style={{ 
            backgroundImage:  `url(${cards[random]})`
          }}>
            <div className="top">
                
                <img className="visa" src= {visa}></img>
                <img src={subtract}></img>
            </div>
            <h5>available balance</h5>
            <h3>{ user ? user.avialableBalance  : "XXXXXXX"} $</h3>  
            <h2>3477 5895 5456 4888</h2>

            <h5>card holder</h5>
            <h3>{name ? name.name: "roy cohen"}</h3>

            <img className="chip" src={chip}></img>
            
           

        </div>
    )
}