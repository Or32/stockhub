import React,{useEffect,useRef} from "react";
import { AreaChart, Area, linearGradient } from "recharts";
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';


export default function Market(){

    const [dow, setdow] = React.useState()
    const [nazdaq, setnazdaq] = React.useState([])
    const [russel, setrussel] = React.useState([])
    const[ loaded1, setloaded1] = React.useState(false)
    const[ loaded2, setloaded2] = React.useState(false)
    const[ loaded3, setloaded3] = React.useState(false)
    

    




    useEffect(() => {
        fetch(`https://api.twelvedata.com/time_series?apikey=4055ad2cca85436ea2296425eb3f427d&interval=1day&dp=2&format=JSON&outputsize=100&type=index&symbol=DJI`)
        .then(res => res.json())
        .then((data) => {setdow(data) 
            console.log("---" + data.status)
        if(data.status == "ok"){
            setloaded1(true)
            console.log(dow)
        }
        else{
            setloaded1(false)
        }
        
        } )
        //.then(setloaded(true))
        fetch(`https://api.twelvedata.com/time_series?apikey=4055ad2cca85436ea2296425eb3f427d&interval=1day&symbol=RUT&dp=2&type=index&outputsize=100&format=JSON`)
        .then(res => res.json())
        .then(data => {setrussel(data)
            if(data.status == "ok"){
                setloaded2(true)
            }
            else{
                setloaded2(false)
            }})
        fetch(`https://api.twelvedata.com/time_series?apikey=4055ad2cca85436ea2296425eb3f427d&interval=1day&dp=2&format=JSON&type=index&symbol=IXIC&outputsize=100`)
        .then(res => res.json())
        .then(data => {setnazdaq(data)
            if(data.status == "ok"){
                setloaded3(true)

            }
        else{
            setloaded3(false)
        }})
      

       



      }, []);

   

      
    
      



    const autoplay = useRef(Autoplay({ delay: 3000 }));
    const autoplay2 = useRef(Autoplay({ delay: 3000 }));
    const autoplay3 = useRef(Autoplay({ delay: 3000 }));



    return(
        loaded1 && loaded2 && loaded3 ?

        <div className="market">
            

            <div className="etf green" >
                <h3>dow jones</h3>
                <Carousel className="change"
      //sx={{ maxWidth: 320 }}
      //mx="auto"
      
      height={200}
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
      withControls={false}
      orientation="vertical"
      loop
    >
    
      <Carousel.Slide >{dow.values[0].close}$</Carousel.Slide>
      <Carousel.Slide className={Math.sign((dow.values[99].close - dow.values[0].close)) == 1 ? "green" : "red" }>{(((dow.values[99].close-dow.values[0].close)/dow.values[99].close)*100).toFixed(2)}%</Carousel.Slide>
      
      {/* ...other slides */}
    </Carousel >

            <AreaChart 
      width={190}
      height={80}
      data={dow.values}
      margin={{
        top: 0,
        right: 10,
        left: 3,
        bottom: 0
      }}
    >
        
        <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
    </linearGradient>
        </defs>
      <Area type="monotone" dataKey="close" stroke="#8884d8" fillOpacity={10}  fill="url(#colorUv)" />
    </AreaChart>



            
            </div>


            <div className="etf green" >
                <h3>rusell</h3>
                <Carousel className="change"
      //sx={{ maxWidth: 320 }}
      //mx="auto"
      
      height={200}
      stackOffset="expand"
      plugins={[autoplay2.current]}
      onMouseEnter={autoplay2.current.stop}
      onMouseLeave={autoplay2.current.reset}
      withControls={false}
      orientation="vertical"
      loop
    >
    
      <Carousel.Slide >{russel.values[0].close}$</Carousel.Slide>
      <Carousel.Slide className={Math.sign((russel.values[99].close - russel.values[0].close)) == 1 ? "green" : "red" }>{(((russel.values[99].close-russel.values[0].close)/russel.values[99].close)*100).toFixed(2)}%</Carousel.Slide>
      
      {/* ...other slides */}
    </Carousel >

            <AreaChart 
      width={190}
      height={80}
      data={russel.values}
      margin={{
        top: 0,
        right: 10,
        left: 3,
        bottom: 0
      }}
    >
        <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
    </linearGradient>
        </defs>
      <Area type="monotone" dataKey="close" stroke="#8884d8" fillOpacity={10}  fill="url(#colorUv)" />
    </AreaChart>



            
            </div>
            
            
            
            <div className="etf green" >
                <h3>Nazdaq</h3>
                <Carousel className="change"
      //sx={{ maxWidth: 320 }}
      //mx="auto"
      
      height={200}
      plugins={[autoplay3.current]}
      onMouseEnter={autoplay3.current.stop}
      onMouseLeave={autoplay3.current.reset}
      withControls={false}
      orientation="vertical"
      loop
    >
    
      <Carousel.Slide >{nazdaq.values[0].close}$</Carousel.Slide>
      <Carousel.Slide className={Math.sign((nazdaq.values[99].close - nazdaq.values[0].close)) == 1 ? "green" : "red" }>{(((nazdaq.values[99].close-nazdaq.values[0].close)/nazdaq.values[99].close)*100).toFixed(2)}%</Carousel.Slide>
      
      {/* ...other slides */}
    </Carousel >

            <AreaChart 
      width={190}
      height={80}
      data={nazdaq.values}
      margin={{
        top: 0,
        right: 10,
        left: 3,
        bottom: 0
      }}
    >
        <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
    </linearGradient>
        </defs>
      <Area type="monotone" dataKey="close" stroke="#8884d8" fillOpacity={10}  fill="url(#colorUv)" />
    </AreaChart>



            
            </div>


        </div>
        :
        <div>

        </div>
        )
    
}