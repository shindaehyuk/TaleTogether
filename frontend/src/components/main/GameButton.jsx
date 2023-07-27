import Box from '@mui/material/Box';
import './Button.css';

function GameButton(props) {
    return(
        <Box component="div" className={props.state === 'Active' ? 'select' : 'button_color'}>
            <p>시작하기</p>
        </Box>
    );
}

export default GameButton;