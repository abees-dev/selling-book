import Iconify from '@/components/Iconify';
import * as Scroll from 'react-scroll';
import Image from '@/components/Image';
import axios from '@/utils/axios';
import { Box, Button, Card, Grid, Pagination, Rating, Stack, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React, { useEffect, useState } from 'react';
import BookShopSearch from './BookShopSearch';
import { useRecoilState, useRecoilValue } from 'recoil';
import booksAtom from '@/recoils/booksAtom';
import orderBookAtom from '@/recoils/oderBookAtom';
import userAtom from '@/recoils/userAtom';
import { useNavigate } from 'react-router-dom';
import { PATH_AUTH } from '@/routes/paths';
import { useSnackbar } from 'notistack';
import TabButton from '@/components/TabButton';
import PaginateCustom from '@/components/PaginationCustom';
import { set } from 'nprogress';

const BUTTON_LIST = [
  {
    title: 'all books',
    color: 'primary',
    type: 'all',
  },
  {
    title: 'Kindergarten',
    color: 'inherit',
    type: 'Kindergarten',
  },
  {
    title: 'High School',
    color: 'inherit',
    type: 'High School',
  },
  {
    title: 'College',
    color: 'inherit',
    type: 'College',
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(5),
}));

const BookShopList = () => {
  const [bookData, setBookData] = useRecoilState(booksAtom);

  const [orderState, setOrderState] = useRecoilState(orderBookAtom);

  const [paginate, setPaginate] = useState(null);

  const [page, setPage] = useState(1);

  const [buttonType, setButtonType] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const scroll = Scroll.animateScroll;

  const { isAuthenticated } = useRecoilValue(userAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/books/list`, { params: { pages: page, limit: 6 } });
        setBookData(res.books);
        setPaginate(res.paginate);
      } catch (error) {
        console.log(error);
      }
    };
    console.log('mounted');
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // const handleNextPage = () => {
  //   if (paginate.nextPage) {
  //     setCurrentPage((prev) => prev + 1);

  //     scroll.scrollTo(300);
  //   }
  // };

  // const handlePrevPage = () => {
  //   if (paginate.prevPage) {
  //     setCurrentPage((prev) => prev - 1);

  //     scroll.scrollTo(300);
  //   }
  // };

  const handleChangePage = (event, value) => {
    setPage(value);
    scroll.scrollTo(300);
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
      enqueueSnackbar('Add to cart successfully');
    } else {
      enqueueSnackbar('Please login before adding cart', { variant: 'error' });

      navigate(PATH_AUTH.login);
    }
  };

  const handleSearchButton = async (type) => {
    try {
      const res = await axios.get('/api/books/list', { params: { type: type } });
      setBookData(res.books);
      setButtonType(type);
    } catch (error) {
      return error;
    }
  };

  return (
    <RootStyle>
      <Stack direction="row" spacing={2}>
        {BUTTON_LIST.map((item, index) => (
          <TabButton
            key={index}
            title={item.title}
            handleClick={() => handleSearchButton(item.type)}
            color={buttonType === item.type ? 'primary' : 'inherit'}
          />
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
      <PaginateCustom paginate={paginate || {}} onChange={handleChangePage} />
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
