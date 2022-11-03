/* App.js */
import React, { Component } from 'react';
import {
	
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	
	ResponsiveContainer,
	ComposedChart
  } from "recharts";




function Chart() {
    const [data,setdata] =React.useState([])

	React.useEffect(() => {
		fetch(`https://api.twelvedata.com/time_series?apikey=4055ad2cca85436ea2296425eb3f427d&interval=1day&dp=2&format=JSON&type=stock&outputsize=500&symbol=AAPL`)
            .then(res => res.json())
            .then(data => {setdata(data.values)
			console.log(data)})
			
	  }, []);
	


	return (
		<ResponsiveContainer width="100%" height="100%">

		<ComposedChart
      width={1000}
      height={400}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0
      }}
	 
    >
		 <defs>
		 <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
    </linearGradient>
	  </defs>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="datetime" />
      <YAxis />
      <Tooltip />
      
	  
	  <Area type="monotone" dataKey="close" stroke="#8884d8" fill="url(#colorUv)" />
	  

    </ComposedChart>
	</ResponsiveContainer>
	  );


	
}
export default Chart;