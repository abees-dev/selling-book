import { PageHero } from '@/components/hero-pages';
import Page from '@/components/Page';
import { Subscribe } from '@/components/subscribe-section';
import { BookShopList, NavBar } from '@/sections/book-shop';
import { Container, Grid } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

const RootStyle = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}));

const BookShop = () => {
  return (
    <Page title="Book shop">
      <RootStyle>
        <PageHero
          title="Eduvi onLine"
          subtitle="Book shop"
          image="https://res.cloudinary.com/abeesdev/image/upload/v1655302553/Logo/t5gmzy3mxbjnk0asa65l.png"
        />
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item lg={4}>
              <NavBar />
            </Grid>
            <Grid item lg={8}>
              <BookShopList />
            </Grid>
          </Grid>
        </Container>
        <Subscribe />
      </RootStyle>
    </Page>
  );
};

export default BookShop;
