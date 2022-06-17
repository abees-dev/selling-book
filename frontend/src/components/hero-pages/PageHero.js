import PropTypes from 'prop-types';
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
}));
const PageHero = ({ title, subtitle, image, sx, ...other }) => {
  return (
    <RootStyle sx={{ ...sx }}>
      <Container maxWidth="lg">
        <HeroStyle>
          <Stack direction="row" alignItems="center" justifyContent="space-evenly" sx={{ height: 1, width: 1 }}>
            <Typography variant="h4" sx={{ ml: 5 }}>
              {title} <br />
              {subtitle}
            </Typography>
            <CardMedia
              component="img"
              height="210"
              image={image}
              sx={{ maxWidth: 500, objectFit: 'contain' }}
            ></CardMedia>
          </Stack>
        </HeroStyle>
      </Container>
    </RootStyle>
  );
};

PageHero.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  image: PropTypes.string,
};

export default PageHero;
