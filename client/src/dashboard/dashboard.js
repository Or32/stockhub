import React, { useState } from 'react';
import Sidebar  from './sidebar';
import './sidebar.css'
import Navbar from './Navbar';
import {  Outlet} from "react-router-dom";

import AccesDenied from './AccesDenied';
import UseFetchUserDetails from './API/useFetchUserDetails';


export default function Dashboard(props){

    
    const {name} = UseFetchUserDetails(props.jwt)
    
   


    
    
    return(
        <div>
             {/* //props.jwt */}
            {props.jwt ?
            <div className='dashboard'>
                <Sidebar/>
           <Navbar  search={props.search} setsearch={props.setsearch} setupdate={props.setupdate} name={name.name}/>
           <div className='change'>
               <Outlet/>
           
           {/* <Routes>

        <Route path="/search" element={< Search ticker={value}/>}/>
        <Route path="/reaserch" element={< Reaserch/>}/>

         
        </Routes> */}
           

           </div>

            </div> 
            :
            <AccesDenied/> }
       
           
        </div>
       

    )
}


