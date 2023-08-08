import React from 'react';
import Button from '@mui/material/Button';
import createChatAxios from '../../../api/chat-gpt/createChatAxios';

function MakeScript() {
  const maekchatHandler = async () => {
    const res = await createChatAxios();
    console.log(res);
  };
  return (
    <>
      <div>MakeImage</div>;
      <button onClick={maekchatHandler} variant="text" color="default">
        이거 눌러봐
      </button>
      <Button onClick={maekchatHandler} variant="text" color="inherit" size="small">
        Install
      </Button>
    </>
  );
}

export default MakeScript;
