import { m } from 'framer-motion';
import { varFade, MotionViewport } from '../animate';
import { Avatar, Box, Button, Card, Container, InputBase, Stack, Typography } from '@mui/material';
import { alpha, styled } from '@mui/system';
import React from 'react';

const RootStyle = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(10),
}));

const CardStyle = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: alpha('#0A033C', 0.9),
  minHeight: 420,
  position: 'relative',
}));

const AvatarContent = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  position: 'absolute',
}));

const AVATAR_LIST = [
  {
    id: 1,
    src: 'https://res.cloudinary.com/abeesdev/image/upload/v1655293427/Logo/awr7d7jqpzlkuoh6plqa.png',
    top: '10%',
    left: '30px',
    variant: varFade().inLeft,
  },
  {
    id: 2,
    src: 'https://res.cloudinary.com/abeesdev/image/upload/v1655293427/Logo/qw0enffv3l3wwcxulyed.png',
    top: '10%',
    left: 'calc(100% - 70px)',
    variant: varFade().inRight,
  },
  {
    id: 3,
    src: 'https://res.cloudinary.com/abeesdev/image/upload/v1655293427/Logo/p7wdocokaft99xvyistz.png',
    top: '45%',
    left: '10%',
    variant: varFade().inUp,
  },
  {
    id: 4,
    src: 'https://res.cloudinary.com/abeesdev/image/upload/v1655293428/Logo/fiuagl2075gaw94hepqg.png',
    top: '45%',
    left: 'calc(80% + 70px)',
    variant: varFade().inDown,
  },
  {
    id: 5,
    src: 'https://res.cloudinary.com/abeesdev/image/upload/v1655293427/Logo/givpi0ict7g0eve9sxga.png',
    top: 'calc(90% - 42px)',
    left: '30px',
    variant: varFade().inLeft,
  },
  {
    id: 6,
    src: 'https://res.cloudinary.com/abeesdev/image/upload/v1655293427/Logo/lxp1socu2n4osg9fni17.png',
    top: 'calc(90% - 42px)',
    left: 'calc(100% - 70px)',
    variant: varFade().inRight,
  },
];
const Subscribe = () => {
  return (
    <RootStyle component={MotionViewport}>
      <Container maxWidth="lg">
        <CardStyle>
          <Stack alignItems="center">
            <m.div variants={varFade().inLDown}>
              <Typography variant="h2" color="common.white" align="center" sx={{ mb: 3 }}>
                Subscribe For Get Update
                <br /> Every New Courses
              </Typography>
            </m.div>
            <m.div variants={varFade().inUp}>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                20k+ students daily learn with Eduvi. Subscribe for new courses.
              </Typography>
            </m.div>

            <Stack direction="row" alignItems="center">
              <m.div variants={varFade().inLeft}>
                <InputBase
                  placeholder="Enter your email"
                  sx={{
                    backgroundColor: alpha('#fff', 0.2),
                    px: 3,
                    py: 1,
                    color: '#fff',
                    minWidth: 260,
                    borderTopLeftRadius: 8,
                    borderBottomLeftRadius: 8,
                  }}
                />
              </m.div>
              <m.div variants={varFade().inRight}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                  }}
                >
                  Subscribe
                </Button>
              </m.div>
            </Stack>
          </Stack>

          <AvatarContent>
            {AVATAR_LIST.map((item) => (
              <m.div key={item.id} variants={item.variant}>
                <AvatarStyle src={item.src} sx={{ top: item.top, left: item.left, width: 50, height: 50 }} />
              </m.div>
            ))}
          </AvatarContent>
        </CardStyle>
      </Container>
    </RootStyle>
  );
};

export default Subscribe;
