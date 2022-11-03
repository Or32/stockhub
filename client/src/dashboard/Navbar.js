import React, { useState } from 'react';

import { useMantineTheme } from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons';
import {  NavLink } from 'react-router-dom';

import { Avatar, MantineProvider } from '@mantine/core';
import { Autocomplete } from '@mantine/core';
import stocksTicker from '../stocksTicker.json'




export default function Navbar(props){
  
    
    const theme = useMantineTheme()
   

    

    // const [first, last] = name.name.split(' ');
   
    //  const {name} = UseFetchUserDetails()
    
 
    
    // const word = ( ) =>{
    //   const [first, last] = name.name.split(' ');

    //   return (
    //   first
    //   )

    // }
      
    
    // if( typeof name === 'object' && !load){

      const [first, setfirst] =React.useState("")
      const [initials, setinitials] =React.useState("")
      const data = stocksTicker.map((item) => ({ ...item, value: item.value }));
      console.log(data)



      React. useEffect(() => {
        if(props.name){
          const name = props.name.split(' ');
          setfirst(name[0])

          const fullName = props.name.split(' ');
          setinitials(fullName.shift().charAt(0) + fullName.pop().charAt(0));
        }

        
       
      }, [props]);
      
    //   console.log(first)

    //   setwords(first);
    //   console.log(words)
    //   setload(true)
     

    // }
  
    

    return(
        <div className='navbar'>
           <ul className='right'>
               <li><MantineProvider
               theme={{
                colors: {
                  'purple': ['#862E9C', '#CC5DE8', '#44CADC', '#2AC9DE', '#1AC2D9', '#11B7CD', '#09ADC3', '#0E99AC', '#128797', '#147885'],
                  
                },
              }}><Avatar color='grape.9' radius="xl">{initials.toUpperCase()}</Avatar></MantineProvider></li>
               <li><h1>Hi { props ? first : ''}</h1></li>
           </ul>


           <ul className='left'>
           <li>
        {/* <input type="text" value={props.search} onChange={e => props.setsearch(e.target.value)}></input> */}
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
            '#202124',
          ],
        },
      }}>
        <Autocomplete className='searchbar' 
        
      icon={<IconSearch />}
      placeholder="Pick one"
      value={props.search} 
      onChange={props.setsearch}
      data={data}
      color='grape.9' 
    />
    </MantineProvider>
    
       
      </li>
      <li>
        <NavLink to="/Dashboard/search" ><IconArrowRight onClick={() => props.setupdate(prevCheck => !prevCheck)} /></NavLink>
      </li>
      
           </ul>
        </div>
    )
}
