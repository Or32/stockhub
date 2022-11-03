import React, { useState,useEffect } from 'react';
import Article from './article';
import './search.css';

import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


export default function Reaserch(){
    const [articles, setarticles] = React.useState([])
    


    React.useEffect(() => {
        fetch(`https://finnhub.io/api/v1/news?category=general&token=ccg77n2ad3i41pnsjobg`)
            .then(res => res.json())
            .then(data => setarticles(data))
    }, [])

    
   //`https://finnhub.io/api/v1/news?category=general&token=cc1505qad3iblgaihpag`

      const articleElement = articles.map(article=>(
        <Article 
        title={article.headline}
        date={article.datetime}
        category={article.category}
        summary={article.summary}
        url={article.url}
        id={article.id}
        img={article.image}

        />
      ))


      const [page, setPage] = React.useState(1);
        
        
        const handleChange = (event, value) => {
          setPage(value);
        };

        const pageArticle = articleElement.slice(page*10,(page+1)*10)



    

   

    
  

    

    return(
        <div className='research'>
            <h1>lateses news from the market</h1>
            <Typography className='page' style={{color:'white'}} >Page: {page}</Typography>
            <div className='articels' alignItems="center">
                 {pageArticle}
            </div>
            
            
            <Stack spacing={2} alignItems="center">
           
            <Pagination count={9} page={page} onChange={handleChange}  className="Pagination"  />
            </Stack>


        </div>
    )
}