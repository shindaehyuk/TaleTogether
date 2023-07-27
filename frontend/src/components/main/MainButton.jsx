import Box from '@mui/material/Box';
import './Button.css';


function MainButton(props) {
    return(
        <Box component="div" className={props.state === 'Active' ? 'select' : 'button_color'}>
            <p>메인페이지</p>
        </Box>
    );
}

export default MainButton;