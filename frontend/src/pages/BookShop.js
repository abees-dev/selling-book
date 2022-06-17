import Page from '@/components/Page';
import { Subscribe } from '@/components/subscribe-section';
import { BookShopHero, BookShopList, NavBar } from '@/sections/book-shop';
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
        <BookShopHero />
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
