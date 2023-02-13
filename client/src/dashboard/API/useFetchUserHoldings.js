import React,{useState, useEffect} from "react";
import axios from "axios";


export default  function useFetchUserHoldings(jwt){// jwt is needed
   
        const [user, setUser] = useState([]);
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
      
              setUser(response.data.stock.holding);
            } catch (error) {
              setError(error.message);
            } finally {
              setLoaded(true);
            }
          })();
        }, []);
        
      
        return { user, error, loaded };
    




}

