import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';


import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Login from './login';
// import Getpost from './getpost';

import Dashboard from './dashboard/dashboard'
import Reaserch from './dashboard/pages/reaserch';
import Search from './dashboard/search/search';
import Perfomance from './dashboard/pages/perfomance/performance';
import HoldingsPage from './dashboard/pages/Holdings-page';
import WatchList from './dashboard/pages/Watchlist';
import History from './dashboard/pages/history';

import SignUp from './Sign-up/Signup';
import SignIn from './Sign-up/Sign-in';
import Home from './Home/Home';





 function App(){
   
  const [search, setsearch] = useState('AAPL');
  const [update, setupdate] = useState(true)
  const [jwt,setjwt] = useState("");

  const [user, setuser] = useState([]);
  

  useEffect(() => {
     axios.get('https://stockhub-64px.vercel.app/getuser',{
    headers: {
      'Authorization': jwt,///jwt
    }
  }).then((respond)=>{
    
     setuser(respond);
     

  
  
   

  })
  
  }, []);// should happend after every action effecting the data-base

  



  

  return(
    <BrowserRouter>

    <Routes>
      <Route path='Home' element={<Home/>}>
        
      </Route>
      <Route path='sign-up' element={<SignUp/>}/>
      <Route path='sign-in' element={<SignIn setjwt={setjwt}/>}/>

     <Route path='Dashboard' element={<Dashboard  search={search} setsearch={setsearch} setupdate={setupdate} jwt={jwt}/>}>

        <Route path="search" element={< Search ticker={search}  update={update} jwt={jwt}/>}/>
        <Route path="reaserch" element={< Reaserch jwt={jwt}/>}/>
        <Route path="performance" element={< Perfomance user={user} jwt={jwt} setsearch={setsearch}/>}/>
        <Route path="holdings" element={< HoldingsPage jwt={jwt} setsearch={setsearch}/>}/>
        <Route path="watchlist" element={< WatchList jwt={jwt} setsearch={setsearch}/>}/>
        <Route path="history" element={< History jwt={jwt}/>}/>




     </Route>
      
     </Routes>
    
    
    
    </BrowserRouter>

  )
}













const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>


    <App/>
     

  </React.StrictMode>
);

