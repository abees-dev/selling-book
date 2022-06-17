import { m } from 'framer-motion';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Button, Container, Typography, Stack, CardMedia, Card } from '@mui/material';
// routes
// components
import { MotionContainer, varFade, varSlide } from '../../components/animate';

import { groupImage, lightBulbImage, pageImage, presentationImage } from '@/assets/images';

// ----------------------------------------------------------------------

const RootStyle = styled(m.div)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.grey[400],
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
  },
}));

const ContentStyle = styled((props) => <Stack spacing={5} {...props} />)(({ theme }) => ({
  zIndex: 10,
  maxWidth: 520,
  margin: 'auto',
  textAlign: 'center',
  position: 'relative',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    margin: 'unset',
    textAlign: 'left',
  },
}));

const BannerStyle = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const CardStyle = styled(Card)(({ theme }) => ({
  minWidth: 82,
  padding: theme.spacing(2),
  position: 'absolute',
  backgroundColor: theme.palette.grey[200],
}));
// ----------------------------------------------------------------------

const CARD_LIST = [
  {
    id: 1,
    image: pageImage,
    top: '-5px',
    left: '30px',
    variant: varSlide().inUp,
  },
  {
    id: 2,
    image: presentationImage,
    top: '50%',
    left: '88px',
    variant: varSlide().inLeft,
  },
  {
    id: 3,
    image: lightBulbImage,
    top: '10%',
    left: 'calc(80% - 20px)',
    variant: varSlide().inDown,
  },
  {
    id: 4,
    image: groupImage,
    top: '70%',
    left: 'calc(100% - 40px)',
    variant: varSlide().inRight,
  },
];

export default function HomeHero() {
  return (
    <MotionContainer>
      <RootStyle>
        <Container sx={{ display: 'flex' }}>
          <ContentStyle>
            <m.div variants={varFade().inRight}>
              <Button size="large" variant="contained" color="inherit" sx={{ color: 'primary.main' }}>
                Never Stop Learning
              </Button>
            </m.div>

            <m.div variants={varFade().inRight}>
              <Typography variant="h1" sx={{ color: 'common.white' }}>
                Grow up your skills by online courses with
                <Typography component="span" variant="h1" sx={{ color: 'primary.main' }}>
                  &nbsp;Eduvi
                </Typography>
              </Typography>
            </m.div>

            <m.div variants={varFade().inRight}>
              <Typography sx={{ color: 'common.white' }}>
                Eduvi is a Global training provider based across the UK that specialises in accredited and bespoke
                training courses. We crush the barriers togetting a degree.
              </Typography>
            </m.div>
          </ContentStyle>
          <BannerStyle alignItems="flex-end" sx={{ width: 1, height: 1, my: 15 }} position="relative">
            <Card
              sx={{
                maxWidth: 520,
                px: 8,
                background: `linear-gradient(230deg, transparent,${alpha('#fff', 0.01)},${alpha('#fff', 0.02)}, ${alpha(
                  '#fff',
                  0.3
                )},#e0e0e0)`,
              }}
            >
              <CardMedia
                component="img"
                sx={{ maxHeight: '80vh' }}
                image="https://res.cloudinary.com/abeesdev/image/upload/v1655207057/Logo/j2o07xoa3tutxf0wkdmm.png"
              />
            </Card>
            {CARD_LIST.map((card) => (
              <CardStyle
                key={card.id}
                component={m.div}
                variants={card.variant}
                sx={{ top: card.top, left: card.left }}
              >
                <CardMedia component="img" height="50" image={card.image} />
              </CardStyle>
            ))}
          </BannerStyle>
        </Container>
      </RootStyle>
    </MotionContainer>
  );
}
