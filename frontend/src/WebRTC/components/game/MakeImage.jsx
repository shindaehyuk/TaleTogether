import React from 'react';
import MakeScript from './MakeScript';
import Button from '@mui/material/Button';

function MakeImage() {
  const maekchatHandler = async () => {
    const res = await MakeScript();
    console.log(res);
  };
  return (
    <>
      <div>MakeImage</div>;
      <Button onClick={maekchatHandler} variant="text" color="default">
        이거 눌러봐
      </Button>
    </>
  );
}

export default MakeImage;
