import { MotionViewport, varFade, varSlide } from '@/components/animate';
import { m } from 'framer-motion';
import { Box, Button, Card, CardMedia, Container, Stack, styled, Typography } from '@mui/material';
import React from 'react';
import Image from '@/components/Image';
// import PropTypes from 'prop-types';

// ------------------------------------------
const RootStyle = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(10),
}));

const PatternStyle = styled(Box)(({ theme }) => ({
  width: 150,
  height: 150,
  position: 'absolute',
  top: -20,
  left: '25%',
  zIndex: 1,
}));

const CardStyle = styled(Card)(({ theme }) => ({
  minWidth: 40,
  padding: theme.spacing(1),
  position: 'absolute',
  backgroundColor: theme.palette.grey[200],
  borderRadius: 8,
}));

const CARD_LIST = [
  {
    id: 1,
    image: 'https://res.cloudinary.com/abeesdev/image/upload/v1655226491/Logo/rrxsslheakfr7qthujgn.png',
    top: '20px',
    left: '30px',
    variant: varSlide().inUp,
  },
  {
    id: 2,
    image: 'https://res.cloudinary.com/abeesdev/image/upload/v1655226491/Logo/yol975u3cipoub7f2uoh.png',
    top: '20%',
    left: '70%',
    variant: varSlide().inLeft,
  },
  {
    id: 3,
    image: 'https://res.cloudinary.com/abeesdev/image/upload/v1655226491/Logo/bk4nkx8sjfuvlcbavnbd.png',
    top: '-10%',
    left: 'calc(80% - 20px)',
    variant: varSlide().inDown,
  },
];
function HomeRegisterCourse(props) {
  return (
    <RootStyle maxWidth="lg" component={MotionViewport}>
      <Card sx={{ bgcolor: '#EDE9F2' }}>
        <Stack direction="row" sx={{ minHeight: 668 }} alignItems="center">
          <Stack sx={{ width: 2 / 4, height: 1, pl: 15 }} justifyContent="center">
            <m.div variants={varFade().inLeft}>
              <Button variant="contained" color="inherit" sx={{ color: 'primary.main', mb: 3 }}>
                College Level
              </Button>
            </m.div>
            <m.div variants={varFade().inDown}>
              <Typography variant="h3" sx={{ mb: 3 }}>
                Don’t waste time in <br /> COVID-19 pandemic.
                <br /> Develop your skills.
              </Typography>
            </m.div>
            <m.div variants={varFade().inDown}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                High-definition video is video of higher resolution and quality than standard-definition. While there is
                no standardized meaning for high-definition, generally any video.
              </Typography>
            </m.div>
            <m.div variants={varFade().inLeft}>
              <Button variant="contained" color="primary" size="large" sx={{ fontWeight: 500 }}>
                Registation Now
              </Button>
            </m.div>
          </Stack>

          <Box position="relative" sx={{ ml: 5, mt: 10 }}>
            <PatternStyle>
              <Image src="https://res.cloudinary.com/abeesdev/image/upload/v1655225907/Logo/qnpntodkhsayfmtlzuzl.png" />
            </PatternStyle>
            <Box position="relative" sx={{ zIndex: 1000 }}>
              <Image src="https://res.cloudinary.com/abeesdev/image/upload/v1655224007/Logo/am31w0wqa9ofahrxeloj.png"></Image>
            </Box>

            {CARD_LIST.map((card) => (
              <CardStyle
                key={card.id}
                component={m.div}
                variants={card.variant}
                sx={{ top: card.top, left: card.left }}
              >
                <CardMedia component="img" height="20" image={card.image} />
              </CardStyle>
            ))}
          </Box>
        </Stack>
      </Card>
    </RootStyle>
  );
}

export default HomeRegisterCourse;
