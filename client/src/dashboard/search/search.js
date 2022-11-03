import React, { useState } from 'react';

import './search.css';

import Tabs from './Tabs'
import useFetchUserHoldings from '../API/useFetchUserHoldings';
import { Modal, Button, Group,Tooltip } from '@mantine/core';
import FormStock from './Form';
import Chart from '../pages/chart';
import { IconStar } from '@tabler/icons';

import axios from 'axios';

import useFetchScore from '../API/useFetchScore';


export default function Search(props){
    const[change,set] = React.useState(false)
    const [price, setprice] = React.useState([])
    const [amount, setamount] = React.useState([])
    const {user} = useFetchUserHoldings(props.jwt)//jwt

    const stock = user.find(x => x.ticker === props.ticker)
    

    
    const [profile, setprofile] = React.useState([])
    const [finance, setfinance] = React.useState([])
    const [data, setdata] = React.useState([])
    const [rating, setrating] = React.useState([])
    const [pricetarget, setpricetarget] = React.useState([])
    const {score, error1, loaded1} = useFetchScore(props.ticker);
    const [articles, setarticles] = React.useState([])


    const [InTheMoney, setInTheMoney]= React.useState(true) ;
    const [all, setall] =React.useState(false) ;
    const [opened, setOpened] = useState(false);
    const [list, setUser] = useState([]);
        const [error, setError] = useState("");
        const [loaded, setLoaded] = useState(false);
   // const [exist,setexist] =React.useState(list.some((ticker)=> ticker.ticker == props.ticker)? true : false)
    const [kind,setkind] = React.useState("add")
    const [update, setupdate] = React.useState(false)
    console.log("1")
    console.log(list)
    
    

    React.useEffect(() => {
          
       
            fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${props.ticker}&token=ccg77n2ad3i41pnsjobg`)
            .then(res => res.json())
            .then(data => setprofile(data))


            fetch(`https://finnhub.io/api/v1/quote?symbol=${props.ticker}&token=ccg77n2ad3i41pnsjobg`)
            .then(res => res.json())
            .then(data => setprice(data))

            fetch(`https://finnhub.io/api/v1/stock/financials-reported?symbol=${props.ticker}&token=ccg77n2ad3i41pnsjobg`)
            .then(res => res.json())
            .then(data => setfinance(data.data[0].report))


            fetch(`https://finnhub.io/api/v1/stock/recommendation?symbol=${props.ticker}&token=ccg77n2ad3i41pnsjobg`)
            .then(res => res.json())
            .then(data => setrating(data[0]))

            fetch(`https://finnhub.io/api/v1/stock/price-target?symbol=${props.ticker}&token=sandbox_cc1505qad3iblgaihpb0`)
            .then(res => res.json())
            .then(data => setpricetarget(data))

            // fetch(`https://finnhub.io/api/v1/stock/earnings-quality-score?symbol=${props.ticker}&freq=annual&token=sandbox_cc1505qad3iblgaihpb0`)
            // .then(res => res.json())
            // .then(data => setscore(data.data[0]))

            fetch(`https://newsapi.org/v2/everything?q=${props.ticker}&sortBy=popularity&apiKey=510217a4d45f43c09d4c9a38386091c9`)
            .then(res => res.json())
            .then(data => setarticles(data.articles))

            

            




            if(Math.sign(price.c)== -1){
                setInTheMoney(false)

            }
            else{
                setInTheMoney(true)

                
            }  
            console.log(list)


           
            
            
            
    }, [props.update])
        React.useEffect(() =>{
            (async () => {
                try {
                  const response = await axios.get(
                    'http://localhost:3000/getuser',{
        headers: {
          'Authorization': props.jwt,///jwt
        }
      }
                  );
          
                  setUser(response.data.stock.WatchList);
                  
                } catch (error) {
                  setError(error.message);
                } finally {
                  setLoaded(true);
                  setkind(list.some((ticker)=> ticker.ticker == props.ticker)? "remove": "add")
                  console.log(kind)
                }
              })();

        },[update])
   
    

    const handleclick =()=>{
       
        (async () => {
            try {
              const response = await axios.put(
                `http://localhost:3000/${kind}`,{
                    
                        "ticker":props.ticker,
                        "price": 0,
                        // //'all':
                        
                        
                
            
                },
            {headers: {
                
                authorization: props.jwt///jwt
                
    }}
            
    
              );
             
            } catch (error) {
               
               if(error){
                   
                console.log(error);
               }
                
               
            } finally {
              console.log("done")
              setupdate(prev=> !prev)
              
              //setexist(prev => !prev)
              
            }
          })();
    
    }

    
   


    
  

    return(
        <div className='search'>
              <div className='head'>
               <img src={profile.logo}></img>
               <h1>{profile.ticker}</h1>
               <p>{profile.name}</p>
               <div className='watchlist'> 
               
               <IconStar className={list.some((ticker)=> ticker.ticker == props.ticker)?  "yes": "no"} onClick={() => {handleclick()
               setupdate(prev=> !prev)}
            }/>
              
              
               </div>
              

              </div>

 


              <div className='main'>
                  <div className='chart'>
                  <Chart/>
                  </div>
                  
                  <div className='panel'>
                      <ul>
                          <li><h1>{price.c} $</h1></li>
                          <li><h1 className={InTheMoney? "red" : "green" }>{price.dp} %</h1></li>
                          <li><h1 className={InTheMoney? "red" : "green" }>{price.d} $ </h1></li>

                        </ul>
                        

                      <div className='buttons'>
                           
                      
                          
                        <Button styles={(theme) => ({root: {backgroundColor: '#5a189a',}})}  size="md" className='buy'  onClick={() => setOpened(true)}> buy </Button>
                            

                         
                      </div>
                  </div>

                </div>    

              
            
            {/* <Chart ticker={props.ticker} />  */}
            <Tabs profile={profile} finance={finance} rating={rating} pricetarget={pricetarget} price={price} score={score} articles={articles}/>
            

            <Modal className='orderEditor'
            size={400}
            
        opened={opened}
        onClose={() => setOpened(false)}
        title='Order Editor'  
      >
          <FormStock ticker ={props.ticker} price={price} amount={props.amount} stock ={stock} jwt={props.jwt}/>

        
      </Modal>
        </div>
    )
}