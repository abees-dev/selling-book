import { MotionViewport, varFade, varFlip } from '@/components/animate';
import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import Iconify from '@/components/Iconify';
import Image from '@/components/Image';
import TextMaxLine from '@/components/TextMaxLine';
import { Button, Card, Container, Grid, Rating, Stack, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import PaginateCustom from '@/components/PaginationCustom';

const COURSE_OTHER = [
  {
    title: 'The Three Musketeers1',
    rating: 5,
    price: 40,
  },
  {
    title: 'The Three Musketeers2',
    rating: 5,
    price: 40,
  },
  {
    title: 'The Three Musketeers3',
    rating: 5,
    price: 40,
  },
  {
    title: 'The Three Musketeers4',
    rating: 5,
    price: 40,
  },
  {
    title: 'The Three Musketeers5',
    rating: 5,
    price: 40,
  },
  {
    title: 'The Three Musketeers6',
    rating: 5,
    price: 40,
  },
  {
    title: 'The Three Musketeers7',
    rating: 5,
    price: 40,
  },
  {
    title: 'The Three Musketeers8',
    rating: 5,
    price: 40,
  },
];

const paginate = {
  currentPage: 1,
  totalPages: 3,
};

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(5),
}));
const CourseOther = () => {
  return (
    <RootStyle>
      <Container maxWidth="lg" component={MotionViewport}>
        <Typography variant="h5" sx={{ mb: 2 }} component={m.div} variants={varFade().inLeft}>
          Other Courses For High School
        </Typography>
        <Grid container spacing={3}>
          {COURSE_OTHER.map((item, index) => (
            <Grid key={index} item lg={6}>
              <CartCourse items={item} />
            </Grid>
          ))}
        </Grid>
        <PaginateCustom paginate={paginate} />
      </Container>
    </RootStyle>
  );
};

const CartCourse = ({ items }) => {
  const { title, rating, price } = items;
  return (
    <Card sx={{ p: 2, maxHeight: 133 }}>
      <Stack direction="row" spacing={2}>
        <Image
          src="https://img2.thuthuatphanmem.vn/uploads/2019/01/04/anh-co-gai-de-thuong_025058983.jpg"
          sx={{ width: 1 / 4, borderRadius: 1 }}
        />
        <Stack sx={{ flex: 1 }} spacing={0.5}>
          <m.div variants={varFade().inDown}>
            <TextMaxLine line={1} variant="subtitle1">
              {title}
            </TextMaxLine>
          </m.div>
          <m.div variants={varFlip().inX}>
            <Rating defaultValue={rating} precision={0.5} readOnly size="small" />
          </m.div>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline">
            <m.div variants={varFade().inLeft}>
              <Typography variant="subtitle2" color="error">
                ${price}
              </Typography>
            </m.div>
            <m.div variants={varFade().inRight}>
              <Button variant="contained" sx={{ bgcolor: 'primary.light', p: 1.5, minWidth: 0 }}>
                <Iconify icon="bi:cart" />
              </Button>
            </m.div>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

CartCourse.prototypes = {
  items: PropTypes.object,
};

export default CourseOther;
