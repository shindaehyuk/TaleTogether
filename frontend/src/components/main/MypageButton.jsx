import Box from '@mui/material/Box';
import './Button.css';

function MyButton(props) {
    return(
        <Box component="div" className={props.state === 'Active' ? 'select' : 'button_color'}>
            <p>마이페이지</p>
        </Box>
    );
}

export default MyButton;