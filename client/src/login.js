import React, { useState } from "react";

import axios from "axios";

import "./styles.css";
import { useNavigate } from "react-router-dom";

function Login({setjwt}) {
    const navigate = useNavigate();


    const [name, setname] = useState("");
    const [password, setpassword] = useState("");


    function handleSubmit(){
        
        
        axios.post('https://stockhub-64px.vercel.app/login', {
            name: name,
            password: password
        }).then((respond)=>{
            console.log(respond.data.data)
            setjwt(respond.data.data);
            navigate('/getuser')
            
            
            
            
        });


    }



  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        <div className="form">
      
        <div className="input-container">
          <label>Username </label>
          <input type="text"  
          onChange={(event) => {setname(event.target.value);}}
           required/>
          
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="text"  
          onChange={(event) => {setpassword(event.target.value);}}
          required />
          
        </div>
        <div className="button-container">
            <button onClick={handleSubmit}>click</button>
        </div>
        
      
    </div>
      </div>
    </div>
  );
}

export default Login;