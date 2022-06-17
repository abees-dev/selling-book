import Image from '@/components/Image';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Box, Button, Card, Rating, Stack, Typography } from '@mui/material';
import React from 'react';

const NAV_LIST = [
  {
    subheader: 'Popular Books',
    children: [
      {
        ratting: 4.5,
        title: 'The Three Musketeers, by Alexandre Dumas',
        price: 39.0,
        image: 'https://res.cloudinary.com/abeesdev/image/upload/v1655306079/Logo/xsylwmw7q1f9odtuxkia.png',
      },
      {
        ratting: 5,
        title: 'The Three Musketeers, by Alexandre Dumas',
        price: 39.0,
        image: 'https://res.cloudinary.com/abeesdev/image/upload/v1655306079/Logo/ebbspmb6vihgq0mbv1la.png',
      },
    ],
  },
  {
    subheader: 'New Arrivals',
    children: [
      {
        ratting: 5,
        title: 'The Three Musketeers, by Alexandre Dumas',
        price: 39.0,
        image: 'https://res.cloudinary.com/abeesdev/image/upload/v1655306079/Logo/syrixwhvoamvfpi9kuu6.png',
      },
      {
        ratting: 3.5,
        title: 'The Three Musketeers, by Alexandre Dumas',
        price: 39.0,
        image: 'https://res.cloudinary.com/abeesdev/image/upload/v1655306079/Logo/syrixwhvoamvfpi9kuu6.png',
      },
    ],
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const NavBar = () => {
  return (
    <>
      <RootStyle>
        {NAV_LIST.map((item, index) => (
          <Box key={index}>
            <Typography variant="h6" sx={{ mb: 3, mt: 4 }}>
              {item.subheader}
            </Typography>
            <Stack spacing={2}>
              {item.children.map((child, index) => (
                <CardItem key={index} items={child} />
              ))}
            </Stack>
            <Button variant="text" color="primary" sx={{ fontWeight: 500, mt: 2 }}>
              See more
            </Button>
          </Box>
        ))}
      </RootStyle>
    </>
  );
};

const CardItem = ({ items }) => {
  const { ratting, title, price, image } = items;
  const CardStyle = styled(Card)(({ theme }) => ({
    display: 'flex',
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    cursor: 'pointer',
    backgroundColor: theme.palette.background.paper,
  }));

  const CardItemStyle = styled(Card)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.grey[200],
    marginRight: theme.spacing(2),
    width: 80,
    padding: theme.spacing(0.5),
    borderRadius: theme.spacing(1),
  }));
  return (
    <CardStyle>
      <CardItemStyle>
        <Image ratio="4/3" sx={{ height: 50 }} src={image} />
      </CardItemStyle>
      <Stack>
        <Rating defaultValue={ratting} precision={0.5} readOnly size="small" />
        <Typography variant="subtitle1">{title}</Typography>
        <Typography variant="subtitle2" color="error">
          $ {price}
        </Typography>
      </Stack>
    </CardStyle>
  );
};
CardItem.prototype = {
  items: PropTypes.object,
};

export default NavBar;
