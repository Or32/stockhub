import React,{useState, useEffect} from "react";
import axios from "axios";


export default  function useFetchScore(ticker){// jwt is needed
   
        const [score, setScore] = useState({});
        const [error, setError] = useState("");
        const [loaded, setLoaded] = useState(false);
        const letterScore =['F','D','D+','C-','C','C+','B-','B','B+','A-','A']
      
        useEffect(() => {
          setScore({
              
                  
                    "capitalAllocation": ((Math.random() * 80).toFixed(4)+20),
                    "growth": ((Math.random() * 80).toFixed(4)+20),
                    "letterScore": letterScore[Math.floor(Math.random() * 11)],
                    "leverage": ((Math.random() * 80).toFixed(4)+20),
                    "period": "2021-06-01",
                    "profitability": ((Math.random() * 80).toFixed(4)+20),
                    "score": ((Math.random() * 80).toFixed(4)+20)
                  
              
          })
          setLoaded(true)
          

      }, []);
      
        return { score, error, loaded };
    



}