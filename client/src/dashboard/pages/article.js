import React, { useState } from 'react';

export default function Article(props){


    return(
        <div className='article' >
            <a href={props.url}>
                <ul>
                    <li><div className='left'>
                <img src={props.img} />
            </div></li>

            <li>
            <div className='right'>
            <h1>{props.title}</h1>
            <h3>{props.category}</h3>
            <p>{props.summary}</p>

            </div>
            </li>



                </ul>
           
            </a>
        </div>
    )

} 