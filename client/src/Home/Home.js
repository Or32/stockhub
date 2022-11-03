import React from "react";
import Spline from "@splinetool/react-spline";

import './home.css'
import Logo from "../img/try.png";

import { NavLink } from 'react-router-dom';


export default function App() {
    return (
        <div className="home">
            <div className="content">
            <div className="navbar-home">
            <li>
            <img src={Logo} alt="title" />
          </li>
          <li>
            <NavLink to='/Home'><a href="/">Home</a></NavLink>
          </li>
          
          <li>
          <NavLink to='/sign-in'> <a href="/">Login</a></NavLink>
          </li>
          <li>
            <button> <NavLink to='/sign-up'>Get Started</NavLink></button>
          </li>

            </div>
            <h1>Investing just got simple</h1>
        <p>
          StockHub is the one stop platform you need for your next investment
        </p>
        <button>
        <NavLink to='/sign-up' style={{color: 'white', textDecoration: 'none'}}>Get Started</NavLink>
         
        </button>
            </div>


            <div className="spline">
            <Spline scene="https://draft.spline.design/aDqMSf-KdAwgBi3n/scene.splinecode" />
            </div>
           
        </div>
       
    );
  }
  