import React, { useState } from 'react';
import './Article.css'
import { Box } from '@mui/material';



const Scroll = ({imagePaths, stories}) => {
    const [articles, setArticles] = useState([]);

    for (let i = 0; i < stories.length; i++) {
        articles.push({'image': imagePaths[i], 'story': stories[i]});
    }

  return (
    <Box className="no-scroll" 
        style={{
        width: '90%',
        height: '90%',
        overflowY: 'scroll',
        border: '1px solid black',
        margin: '2em'
        }}
    >
        {articles.map((article, index) => (
            <div key={`article${index}`}
            style={{
                display: 'flex',
                justifyContent: 'flex-start'
            }}>
                <p>{article.story}</p>
                <img src={article.image} alt={`image${index+1}`} style={{ marginLeft: 'auto'}}/>
            </div>
        ))}
    </Box>
  );
};

export default Scroll;


