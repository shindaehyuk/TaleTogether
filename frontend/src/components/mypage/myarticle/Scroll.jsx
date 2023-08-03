import React from 'react';
import './Article.css'
import { Box } from '@mui/material';



const Scroll = ({imagePaths, stories}) => {
    const Articles = stories.map((story, index) => ({
        image: imagePaths[index],
        story: story,
      }));

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
        
        {Articles.map((article, index) => (
            <>
            <Box key={`article${index}`}
            sx={{
                width: '100%',
                height: '50%',
                display: 'flex',
                justifyContent: 'flex-start'
            }}>
                <p>{article.story}</p>
                {(article.image&&
                <img src={article.image} style={{ marginLeft: 'auto'}}/>
                )}
            
            </Box>
            <hr style={{ marginBottom: '0px'}}/>
            </>
        ))}
    </Box>
  );
};

export default Scroll;


