
import React, { useState, useEffect } from 'react';
import { Progress } from '@mantine/core';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts";


export default function AnalysisTab(props){
   
    const [analysists, setanalysists] = React.useState();
    const [recommendation ,setrecommendation]= React.useState("");
    const[color,setcolor] = React.useState("");
    useEffect(() => {
          
    setanalysists(
        props.rating.strongBuy+
        props.rating.buy+
        props.rating.hold+
        props.rating.sell+
        props.rating.strongSell)


    if((props.rating.strongBuy>props.rating.buy) && (props.rating.strongBuy>props.rating.hold)&&(props.rating.strongBuy>props.rating.sell)&&(props.rating.strongBuy>props.rating.strongSell)){
        setrecommendation("strongBuy")
        setcolor("blue")
    }
    if((props.rating.buy>props.rating.strongBuy)&& (props.rating.buy>props.rating.hold)&&(props.rating.buy>props.rating.sell)&&(props.rating.buy>props.rating.strongSell)){
        setrecommendation("buy")
        setcolor("green")

    }
    if((props.rating.hold>props.rating.buy)&& (props.rating.hold>props.rating.strongBuy)&&(props.rating.hold>props.rating.sell)&&(props.rating.hold>props.rating.strongSell)){
        setrecommendation("hold")
        setcolor("orange")

    }
    if((props.rating.sell>props.rating.buy)&& (props.rating.sell>props.rating.hold)&&(props.rating.sell>props.rating.strongBuy)&&(props.rating.sell>props.rating.strongSell)){
        setrecommendation("sell")
        setcolor("red")

    }
    if((props.rating.strongSell>props.rating.buy)&& (props.rating.strongSell>props.rating.hold)&&(props.rating.strongSell>props.rating.sell)&&(props.rating.strongSell>props.rating.strongBuy)){
        setrecommendation("strongSell")
        setcolor("#8B0000")

    }
        
      }, [{props}]);

      const data = [
        {
          name: "low",
          price: props.price.c-(props.price.c*0.5),
          current: props.price.c,
         
        },
        {
          name: "mean",
          price: props.price.c-(props.price.c*0.2),
          current: props.price.c,
          
        },
        {
          name: "median",
          price: props.price.c+(props.price.c*0.2),
          current: props.price.c,
          
        },
        {
          name: "high",
          price: props.price.c+ (props.price.c*0.5),
          current: props.price.c,
          
        }
        
      ];
      
      const data2 = [
        {
          subject: 'capitalAllocation',
          A: props.score.cashGenerationCapitalAllocation,
          fullMark: 100,
        },
        {
          subject: 'growth',
          A: props.score.growth,
          
          fullMark: 100,
        },
        {
          subject: 'leverage',
          A: props.score.leverage,
          
          fullMark: 100,
        },
        {
          subject: 'profitability',
          A: props.score.profitability,
          
          fullMark: 100,
        },
        {
          subject: 'score',
          A: props.score.score,
          
          fullMark: 100,
        }
        
      ];



     

    
 

    

    return(
        <div className="analysis-tab">

            <div className='top'>
            
            
            <div className="rating">

            
            <h1> analyst rating based on {analysists} analysists</h1>
            <div className="info">
            
            <div className="left" style={{background:color}} >

                <h1>{recommendation}</h1>


              </div>

           
            
               <div className="right" back>
                   
               <ul>
               <li><Progress value={props.rating.strongBuy/analysists *200} label="strongBuy" size="xl" radius="xl" color="blue"/></li>
               <li><Progress value={props.rating.buy/analysists *200} label="buy" size="xl" radius="xl" color="green"/></li>
               <li><Progress value={props.rating.hold/analysists *200} label="hold" size="xl" radius="xl"  color="orange"/></li>
               <li><Progress value={props.rating.sell/analysists *200} label="sell" size="xl" radius="xl"  color="red"/></li>
               <li> <Progress value={props.rating.strongSell/analysists *200} label="strongSell" size="xl" radius="xl" color="#8B0000" /></li>
               </ul>
            </div>


            </div>
            </div>


            <div className="priceTarget">
                <h1>analyst price target</h1>
            <ComposedChart
              width={600}
              height={200}
              data={data}
              margin={{
               top: 20,
               right: 20,
               bottom: 20,
              left: 20
      }}
    >
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis dataKey="name" scale="auto" />
      <YAxis />
      <Tooltip />
      
      <Bar dataKey="price" barSize={20} fill="#413ea0" />
      <Line type="monotone" dataKey="current" stroke="#ff7300" />
    </ComposedChart>

    



            </div>

            

            </div>
            <div className='low'>
            <RadarChart
      cx={300}
      cy={250}
      outerRadius={150}
      width={1000}
      height={500}
      data={data2}
    >
      <PolarGrid />
      <Tooltip />
      
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis />
      <Radar
        name="scroe"
        dataKey="A"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.6}
      />
    </RadarChart>
                
            </div>



        </div>
    )
} 