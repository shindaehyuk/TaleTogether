import { Box } from '@mui/material';
import Modal from '@mui/material';

function MyStatus() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '90%',
          height: '90%',
          marginTop: '2em',
          border: '1px solid black',
        }}
      >
        <h2>내 정보 수정</h2>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}
        >
          <h3>이메일</h3>
          <input type="text" size="50" />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}
        >
          <h3>닉네임</h3>
          <input type="text" size="50" />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            flexGrow: 1,
          }}
        >
          <button>비밀번호 변경</button>
          <button>수정 완료</button>
          <button>회원 탈퇴</button>
        </Box>
      </Box>
    </>
  );
}

export default MyStatus;
