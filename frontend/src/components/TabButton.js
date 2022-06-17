import { Button } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

const TabButton = ({ title, handleClick, ...other }) => {
  const ButtonStyle = styled(Button)(({ theme }) => ({
    fontWeight: 500,
    fontSize: theme.typography.fontSize,
  }));
  return (
    <ButtonStyle variant="contained" size="large" onClick={handleClick} {...other}>
      {title}
    </ButtonStyle>
  );
};

export default TabButton;
