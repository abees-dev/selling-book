import { Card, CardMedia, Container, Stack, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(10),
}));

const HeroStyle = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300],
  minHeight: 270,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
const BookShopHero = () => {
  return (
    <RootStyle>
      <Container maxWidth="lg">
        <HeroStyle>
          <Stack direction="row" alignItems="center" spacing={15} sx={{ height: 1 }}>
            <Typography variant="h4">
              Eduvi Online <br />
              Book Shop
            </Typography>
            <CardMedia
              component="img"
              height="210"
              image="https://res.cloudinary.com/abeesdev/image/upload/v1655302553/Logo/t5gmzy3mxbjnk0asa65l.png"
              sx={{ maxWidth: 374 }}
            ></CardMedia>
          </Stack>
        </HeroStyle>
      </Container>
    </RootStyle>
  );
};

export default BookShopHero;
