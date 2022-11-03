
import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector } from 'recharts';


  
  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";
  
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        {/* <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#7b2cbf"
        >{`Rate ${(percent * 100).toFixed(2)}%`}</text>
         */}
      </g>
    );
  };
  
  export default function Allocation(props) {
      const [data, setdata] = React.useState([{name:'loading', value: 1}]);
      const [loaded,setloaded] = React.useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const onPieEnter = useCallback(
      (_, index) => {
        setActiveIndex(index);
      },
      [setActiveIndex]
    );

    React.useEffect(() => {
    setdata([])
    props.user.slice(1).map(function(stocks){
        setdata(prev =>[...prev,{name:stocks.ticker, value: stocks.amount} ] )
        
        
    })
    })
    const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
    
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 2;
  const ey = my;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={ex + (cos >= 0 ? 1 : -1) * 1}
      y={ey}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
  
    return (
        <div className="allocation">
      <PieChart width={400} height={400} className="Pie">
        <Pie 
          activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx={200}
            cy={200}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
            label={renderCustomizedLabel}
        />
      </PieChart>
      </div>
    );
  }











// const [data, setdata] = React.useState([]);
// const [loaded,setloaded] = React.useState(false);

// React.useEffect(() => {
//     setdata([])
//     props.user.slice(1).map(function(stocks){
//         setdata(prev =>[...prev,{name:stocks.ticker, value: stocks.amount} ] )
//         console.log(data)
        

//     })
//     setloaded(true)
//     console.log("loaded: "+  loaded)
    
//   },[]);


//return(
//     !loaded?
//     <div></div>
//     :
//     <div className="allocation">

// <PieChart width={400} height={400} className="Pie">
//   <Pie
//   activeIndex={activeIndex}
//   activeShape={renderActiveShape}
//   data={data}
//   cx={200}
//   cy={200}
//   innerRadius={60}
//   outerRadius={80}
//   fill="#8884d8"
//   dataKey="value"
//   onMouseEnter={onPieEnter}
  

// />
// </PieChart>
        


//     </div>
// )