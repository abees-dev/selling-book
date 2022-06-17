import Iconify from '@/components/Iconify';
import * as Scroll from 'react-scroll';
import Image from '@/components/Image';
import axios from '@/utils/axios';
import { Box, Button, Card, Grid, Rating, Stack, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React, { useEffect, useState } from 'react';
import BookShopSearch from './BookShopSearch';
import { useRecoilState, useRecoilValue } from 'recoil';
import booksAtom from '@/recoils/booksAtom';
import orderBookAtom from '@/recoils/oderBookAtom';
import userAtom from '@/recoils/userAtom';
import { useNavigate } from 'react-router-dom';
import { PATH_AUTH } from '@/routes/paths';

const BUTTON_LIST = [
  {
    title: 'all books',
    color: 'primary',
  },
  {
    title: 'Kindergarten',
    color: 'inherit',
  },
  {
    title: 'High School',
    color: 'inherit',
  },
  {
    title: 'College',
    color: 'inherit',
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(5),
}));

const ButtonStyle = styled(Button)(({ theme }) => ({
  fontWeight: 500,
  fontSize: theme.typography.fontSize,
}));

const NavigateStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(5),
  marginBottom: theme.spacing(2),
}));

const BookShopList = () => {
  const [bookData, setBookData] = useRecoilState(booksAtom);

  const [orderState, setOrderState] = useRecoilState(orderBookAtom);

  const [paginate, setPaginate] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const scroll = Scroll.animateScroll;

  const { isAuthenticated } = useRecoilValue(userAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/books/list`, { params: { pages: currentPage, limit: 6 } });
        setBookData(res.books);
        setPaginate(res.paginate);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleNextPage = () => {
    if (paginate.nextPage) {
      setCurrentPage((prev) => prev + 1);

      scroll.scrollTo(300);
    }
  };

  const handlePrevPage = () => {
    if (paginate.prevPage) {
      setCurrentPage((prev) => prev - 1);

      scroll.scrollTo(300);
    }
  };

  const navigate = useNavigate();

  const handleOrder = (order) => {
    if (isAuthenticated) {
      const indexOrder = orderState.findIndex((item) => item._id === order._id);
      setOrderState((prev) => {
        if (indexOrder !== -1) {
          return prev.map((item) => (item._id === order._id ? { ...item, quantity: item.quantity + 1 } : item));
        }
        return [...prev, { ...order, quantity: 1 }];
      });
    } else {
      navigate(PATH_AUTH.login);
    }
  };

  return (
    <RootStyle>
      <Stack direction="row" spacing={2}>
        {BUTTON_LIST.map((item, index) => (
          <ButtonStyle key={index} variant="contained" size="large" color={item.color}>
            {item.title}
          </ButtonStyle>
        ))}
      </Stack>
      <BookShopSearch />
      <Grid container spacing={3}>
        {bookData?.map((item, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <CardItem items={item} handleOrder={() => handleOrder(item)} />
          </Grid>
        ))}
      </Grid>
      <NavigateStyle>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            sx={{ minWidth: 0, p: 1, bgcolor: !paginate?.prevPage ? 'primary.light' : '' }}
            variant="contained"
            onClick={handlePrevPage}
          >
            <Iconify icon="ic:round-navigate-before" sx={{ width: 25, height: 25 }} />
          </Button>
          <Typography variant="body1">Page</Typography>
          <Typography variant="body1">{currentPage}</Typography>
          <Typography variant="body1">of</Typography>
          <Typography variant="body1">{paginate?.totalPages}</Typography>
          <Button
            sx={{ minWidth: 0, p: 1, bgcolor: !paginate?.nextPage ? 'primary.light' : '' }}
            variant="contained"
            onClick={handleNextPage}
          >
            <Iconify icon="ic:round-navigate-next" sx={{ width: 25, height: 25 }} />
          </Button>
        </Stack>
      </NavigateStyle>
    </RootStyle>
  );
};

const CardItem = ({ items, handleOrder }) => {
  const { imageUrl, title, price, ratting } = items;
  return (
    <Box>
      <Card sx={{ p: 3, minWidth: 240 }}>
        <Image src={imageUrl} />
      </Card>
      <Typography variant="subtitle1" sx={{ mt: 1 }}>
        {title}
      </Typography>
      <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
        <Typography variant="body2" color="error">
          $ {price}
        </Typography>
        <Rating defaultValue={ratting} precision={0.5} readOnly size="small" />
      </Stack>
      <Stack alignItems="flex-end">
        <Button variant="outlined" color="primary" size="small" sx={{ mt: 1, fontWeight: 500 }} onClick={handleOrder}>
          Order
        </Button>
      </Stack>
    </Box>
  );
};

export default BookShopList;
