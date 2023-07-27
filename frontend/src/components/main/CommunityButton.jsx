import Box from '@mui/material/Box';
import './Button.css';

function CommunityButton(props) {
    return(
        <Box component="div" className={props.state === 'Active' ? 'select' : 'button_color'}>
            <p>커뮤니티</p>
        </Box>
    );
}

export default CommunityButton;