import React,{useState, useEffect} from "react";



export default  function useFetchStock(ticker){// jwt is needed
   
        const [stock, setStock] = useState({});
        const [error, setError] = useState("");
        const [loaded, setLoaded] = useState(false);
      
        useEffect(() => {
          const url = (`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=ccg77n2ad3i41pnsjobg`);
  
          const fetchData = async () => {
              try {
                  const response = await fetch(url);
                  const json = await response.json();
                  setStock(json);
              } catch (error) {
                setError(error);
              }finally {
                setLoaded(true);
              }
          };
  
          fetchData();
      }, []);
      
        return { stock, error, loaded };
    



}