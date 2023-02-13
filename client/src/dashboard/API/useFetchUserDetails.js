import React,{useState, useEffect} from "react";
import axios from "axios";


export default  function UseFetchUserDetails(jwt){// jwt is needed
   
        const [name, setUser] = useState([]);
        const [error, setError] = useState("");
        const [loaded, setLoaded] = useState(false);
        
        
       
        
      
        useEffect(() => {
          (async () => {
            try {
              const response = await axios.get(
                'https://stockhub-64px.vercel.app/getuser',{
    headers: {
      'Authorization': jwt,///jwt
    }
  }
              );
      
              setUser(response.data.details);
            } catch (error) {
              setError(error.message);
            } finally {
              setLoaded(true);
            }
          })();
        }, []);
        
      
        return { name, error, loaded };
    




}