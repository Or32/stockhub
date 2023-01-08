import React, { useState } from 'react';
import { IconDashboard , IconList, IconWallet, IconLayoutDashboard, IconUser, IconArchive, IconHelp } from '@tabler/icons';
import { NavLink } from 'react-router-dom';
import { Tooltip,Modal,Image} from '@mantine/core';
import logo from '../img/logo.png'
import { Carousel } from '@mantine/carousel';
import dashboard from '../img/dashboad.png';
import holdings from '../img/holdings.png';
import news from '../img/news.png';
import search from '../img/search.png';
import watchlist from '../img/watchlist.png';



export default function Sidebar(){
    const [opened, setOpened] = useState(false);


    return(

        <div className='sidebar'>
            <div className='logo'>
                <img src={logo}></img>

            </div>

            


            <ul className='mid'>
                <li><Tooltip label="Dashboard"><NavLink to="/Dashboard/performance" style={{ textDecoration: 'none', color:"white"}}>  <IconDashboard/> </NavLink></Tooltip></li>
                <li><Tooltip label="watchlist"><NavLink to="/Dashboard/watchlist"><IconList /></NavLink></Tooltip></li>
                <li><Tooltip label="holdings"><NavLink to="/Dashboard/holdings"><IconWallet /></NavLink></Tooltip></li>
                <li><Tooltip label="search"><NavLink to="/Dashboard/search"><IconLayoutDashboard/></NavLink></Tooltip></li>
                <li><Tooltip label="history"><NavLink to="/Dashboard/history"><IconUser/></NavLink></Tooltip></li>
                <li><Tooltip label="research"><NavLink to="/Dashboard/reaserch"><IconArchive/></NavLink></Tooltip></li>
                


            </ul >

            <ul className='low'>
            
           
            <li> <Tooltip label="Tutorial"><IconHelp onClick={() => setOpened(true)}/></Tooltip></li>

            </ul>
            <Modal className='Tutorial'
            size={1000}
            
        opened={opened}
        onClose={() => setOpened(false)}
        title='Tutorial'  
      >
          <Carousel
      sx={{ maxWidth: 800 }}
      mx="auto"
      slideSize="100%"
      withIndicators
      height={500}
      dragFree
      slideGap="md"
      align="start"
      loop
      slidesToScroll={1}
    >
        <Carousel.Slide >
            
         <Image radius="md" src={dashboard} /> 
         </Carousel.Slide>
         <Carousel.Slide >
         <Image radius="md" src={holdings} />
         </Carousel.Slide>
         <Carousel.Slide >
         <Image radius="md" src={news} />
         </Carousel.Slide>
         <Carousel.Slide >
         <Image radius="md" src={search} />
         </Carousel.Slide>
         <Carousel.Slide >
         <Image radius="md" src={watchlist} />
         </Carousel.Slide>

    </Carousel>

      </Modal>


        </div>
    )
    

}