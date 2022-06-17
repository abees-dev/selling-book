import { MotionViewport, varFade } from '@/components/animate';
import { m } from 'framer-motion';
import Image from '@/components/Image';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

const RootStyle = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(10),
}));

const BackgroundStyle = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(to bottom, #FF6652, transparent)',
  width: 480,
  height: 480,
  borderRadius: '50%',
  borderBottomRightRadius: 0,
}));

const HomeMentor = () => {
  return (
    <RootStyle component={MotionViewport}>
      <Stack direction="row" alignItems="center" sx={{ width: 1, height: 510 }} spacing={15}>
        <BackgroundStyle>
          <m.div variants={varFade().inLeft}>
            <Image
              sx={{ width: '90%', ml: 5, borderBottomLeftRadius: '30%' }}
              src="https://res.cloudinary.com/abeesdev/image/upload/v1655228764/Logo/bhoonedma0i2kw579grj.png"
            />
          </m.div>
        </BackgroundStyle>
        <Box sx={{ maxWidth: 480 }}>
          <Typography component={m.div} variants={varFade().inDown} variant="h3" sx={{ mb: 3 }}>
            Want to share your <br /> knowledge? Join us a <br /> Mentor
          </Typography>
          <Typography component={m.div} variants={varFade().inRight} variant="body2" sx={{ mb: 3 }}>
            High-definition video is video of higher resolution and quality than standard-definition. While there is no
            standardized meaning for high-definition, generally any video.
          </Typography>
          <Button
            component={m.div}
            variants={varFade().inUp}
            variant="contained"
            color="primary"
            size="large"
            sx={{ fontWeight: 500 }}
          >
            Career Information
          </Button>
        </Box>
      </Stack>
    </RootStyle>
  );
};

export default HomeMentor;
