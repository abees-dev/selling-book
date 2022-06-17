import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Card, CardMedia, Container, Grid, Stack, Typography } from '@mui/material';
// components
import { IconButtonAnimate, MotionViewport, varFade } from '../../components/animate';
import Iconify from '@/components/Iconify';

// ----------------------------------------------------------------------

const LIST_ITEM = [
  {
    icon: 'fluent:speaker-2-32-filled',
    title: 'Audio Classes',
    color: '#FF6652',
    bgcolor: '#FFF4F2',
  },
  {
    icon: 'fluent:live-24-filled',
    title: 'Live Classes',
    color: '#9C4DF4',
    bgcolor: '#F8F2FF',
  },
  {
    icon: 'fluent:speaker-2-32-filled',
    title: 'Recorded Class',
    color: '#00C968',
    bgcolor: '#E5FFF3',
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
}));

const SocialsButton = styled(Card)(({ theme }) => ({
  width: '100%',
  borderRadius: 8,
  padding: theme.spacing(1, 2),
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.background.neutral,
    color: theme.palette.text.primary,
  },
}));

const IconStyle = styled('div')(({ theme }) => ({
  width: theme.spacing(7),
  height: theme.spacing(7),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 8,
}));

// ----------------------------------------------------------------------

export default function HomeMinimal() {
  const positionCardStyle = {
    position: 'absolute',
    bottom: 68,
    left: 48,
    right: 48,
  };

  const callStyle = {
    position: 'absolute',
    bottom: 68,
    left: '50%',
    zIndex: 1000,
  };
  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Stack
          alignItems="center"
          textAlign="center"
          spacing={3}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        >
          <m.div variants={varFade().inDown}>
            <Typography variant="h2">
              High quality video, audio <br /> & live classes
            </Typography>
          </m.div>
          <Stack component={m.div} variants={varFade().inUp} alignItems="center">
            <Typography variant="body2" sx={{ width: '70%' }}>
              High-definition video is video of higher resolution and quality than standard-definition. While there is
              no standardized meaning for high-definition, generally any video image with considerably more than 480
              vertical scan lines or 576 vertical lines is considered high-definition.
            </Typography>
          </Stack>
          <Stack component={m.div} variants={varFade().inUp} alignItems="center">
            <Button variant="contained" size="large">
              Visit courses
            </Button>
          </Stack>
        </Stack>

        <Box>
          <Stack position="relative">
            <Card sx={{ p: 3 }}>
              <CardMedia
                sx={{ borderRadius: 2 }}
                component="img"
                image="https://res.cloudinary.com/abeesdev/image/upload/v1655211766/Logo/p4mn0ad1vp49qukixfez.png"
              />
            </Card>
            <Box sx={callStyle}>
              <IconButtonAnimate
                sx={{
                  bgcolor: 'error.main',
                  '&:hover': {
                    bgcolor: 'error.dark',
                  },
                }}
              >
                <Iconify icon="fluent:call-end-24-filled" color="common.white" />
              </IconButtonAnimate>
            </Box>
            <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={positionCardStyle}>
              <Card sx={{ maxWidth: 180, p: 2 }}>
                <CardMedia
                  component="img"
                  height="180"
                  sx={{ borderRadius: 1 }}
                  image="https://res.cloudinary.com/abeesdev/image/upload/v1655211776/Logo/v1ptqdbekmgcdgggtywf.png"
                />
              </Card>

              <IconButtonAnimate
                sx={{
                  bgcolor: 'primary.main',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                }}
              >
                <Iconify icon="ic:round-keyboard-arrow-up" color="common.white" />
              </IconButtonAnimate>
            </Stack>
          </Stack>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            {LIST_ITEM.map((item, index) => (
              <Grid key={index} item xs={12} md={4}>
                <SocialsButton>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <IconStyle sx={{ bgcolor: item.bgcolor }}>
                      <Iconify icon={item.icon} sx={{ width: 24, height: 24, color: item.color }} />
                    </IconStyle>
                    <m.div variants={varFade().inLeft}>
                      <Typography variant="h6" color="text.secondary">
                        {item.title}
                      </Typography>
                    </m.div>
                  </Stack>
                </SocialsButton>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </RootStyle>
  );
}
