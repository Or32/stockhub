import React,{useEffect} from "react";
import { Carousel } from '@mantine/carousel';
import { IconArrowRight, IconArrowLeft } from '@tabler/icons';
import { ArticleCardImage } from "./article-card";

export default function NewsTab(props){



    const [articles, setarticles] = React.useState(props.articles)
    
    useEffect(() => {
        setarticles(props.articles)
        console.log(articles)
        console.log("---------------")

        
        
      });//510217a4d45f43c09d4c9a38386091c9
    

    const articleElement = articles.slice(0,20).map(article =>(
        
        <Carousel.Slide>  
            
            <ArticleCardImage 
             image={article.urlToImage}  
             title={article.title}
              
             url={article.url}
            />
        </Carousel.Slide>
    ))


    console.log(articles)

       


      return(

          
          <div className="newsTab">
               
              
              <Carousel
              slideGap="xl"
              loop 
              dragFree
              height={450}
              withControls={false}
             sx={{ maxWidth: 2000 }}
              slideSize="50%"
              breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: 2 }]}
              mx="auto"
              
              controlsOffset="xl" controlSize={27}
              nextControlIcon={<IconArrowRight size={16} />}
               previousControlIcon={<IconArrowLeft size={16} />}
               
              
              >
                  {articleElement}
             
            </Carousel>

          </div>
      )
      
}