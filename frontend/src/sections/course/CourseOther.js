import { MotionViewport, varFade, varFlip } from '@/components/animate';
import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import Iconify from '@/components/Iconify';
import Image from '@/components/Image';
import TextMaxLine from '@/components/TextMaxLine';
import { Button, Card, Container, Grid, Rating, Stack, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React, { useEffect, useState } from 'react';
import PaginateCustom from '@/components/PaginationCustom';
import axios from '@/utils/axios';

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

// const paginate = {
//   currentPage: 1,
//   totalPages: 3,
// };

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(5),
}));
const CourseOther = () => {
  const [course, setCourse] = useState([]);

  const [page, setPage] = useState(1);

  const [paginate, setPaginate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/course/get-course-by-page', { params: { pages: page } });
        console.log(res);
        setCourse(res.data);
        setPaginate(res.paginate);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    console.log('mounted');
  }, [page]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <RootStyle>
      <Container maxWidth="lg" component={MotionViewport}>
        <Typography variant="h5" sx={{ mb: 2 }} component={m.div} variants={varFade().inLeft}>
          Other Courses For High School
        </Typography>
        <Grid container spacing={3}>
          {course?.map((item, index) => (
            <Grid key={index} item lg={6}>
              <CartCourse items={item} />
            </Grid>
          ))}
        </Grid>
        <PaginateCustom paginate={paginate || {}} onChange={handleChangePage} />
      </Container>
    </RootStyle>
  );
};

const CartCourse = ({ items }) => {
  const { title, imageUrl, price } = items;
  return (
    <Card sx={{ p: 2, maxHeight: 133 }}>
      <Stack direction="row" spacing={2}>
        <Image src={imageUrl} sx={{ width: 1 / 4, borderRadius: 1 }} />
        <Stack sx={{ flex: 1 }} spacing={0.5}>
          <TextMaxLine line={1} variant="subtitle1">
            {title}
          </TextMaxLine>
          <Rating defaultValue={5} precision={0.5} readOnly size="small" />
          <Stack direction="row" justifyContent="space-between" alignItems="baseline">
            <Typography variant="subtitle2" color="error">
              ${price}
            </Typography>
            <Button variant="contained" sx={{ bgcolor: 'primary.light', p: 1.5, minWidth: 0 }}>
              <Iconify icon="bi:cart" />
            </Button>
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
