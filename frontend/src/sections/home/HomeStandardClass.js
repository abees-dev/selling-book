import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
// hooks
// components
import { MotionViewport, varFade } from '@/components/animate';
import { CardStandard } from '@/components/standard';

// ----------------------------------------------------------------------

const LESSON_LIST = [
  {
    image: 'https://res.cloudinary.com/abeesdev/image/upload/v1655222998/Logo/i9jajmi50zgdf2w0u7gv.png',
    title: 'Standard One',
    description: 'Standard 1 is a foundation Standard that reflects 7 important concepts',
  },
  {
    image: 'https://res.cloudinary.com/abeesdev/image/upload/v1655222998/Logo/i9jajmi50zgdf2w0u7gv.png',
    title: 'Standard Two',
    description: 'Standard 2 builds on the foundations of Standard 1 and includes requirements',
  },
  {
    image: 'https://res.cloudinary.com/abeesdev/image/upload/v1655222998/Logo/i9jajmi50zgdf2w0u7gv.png',
    title: 'Standard Three',
    description: 'Standard 3 of the Aged Care Quality Standards applies to all services delivering personal',
  },
  {
    image: 'https://res.cloudinary.com/abeesdev/image/upload/v1655222998/Logo/i9jajmi50zgdf2w0u7gv.png',
    title: 'Standard Four',
    description: 'Standard 4 of the Aged Care Quality Standards focuses on services and supports',
  },
  {
    image: 'https://res.cloudinary.com/abeesdev/image/upload/v1655222998/Logo/i9jajmi50zgdf2w0u7gv.png',
    title: 'Standard Five',
    description: 'Standard 5 Learning Resources. Learning Resources ensure that the school has the',
  },
  {
    image: 'https://res.cloudinary.com/abeesdev/image/upload/v1655222998/Logo/i9jajmi50zgdf2w0u7gv.png',
    title: 'Standard Six',
    description: 'Standard 6 requires an organisation to have a system to resolve complaints',
  },
  {
    image: 'https://res.cloudinary.com/abeesdev/image/upload/v1655222998/Logo/i9jajmi50zgdf2w0u7gv.png',
    title: 'Standard Seven',
    description: 'Standard 7 Blood Management mandates that leaders of health service organisations',
  },
  {
    image: 'https://res.cloudinary.com/abeesdev/image/upload/v1655222998/Logo/i9jajmi50zgdf2w0u7gv.png',
    title: 'Standard Eight',
    description: 'Standard 8 Course from NCERT Solutions help students to understand',
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
}));

// ----------------------------------------------------------------------

export default function HomeStandardClass() {
  return (
    <RootStyle>
      <Container component={MotionViewport} sx={{ position: 'relative', textAlign: 'center' }}>
        <m.div variants={varFade().inUp}>
          <Typography variant="h2" sx={{ mb: 3 }}>
            Qualified lessons for students
          </Typography>
        </m.div>

        <m.div variants={varFade().inUp}>
          <Typography color="text.secondary">
            A lesson or class is a structured period of time where learning is intended to occur. It <br /> involves one
            or more students being taught by a teacher or instructor.
          </Typography>
        </m.div>
        <Stack direction="row" justifyContent="center" spacing={2} sx={{ mt: 5 }}>
          <m.div variants={varFade().inLeft}>
            <Button variant="text" color="inherit" sx={{ fontWeight: 500 }}>
              Kindergarten
            </Button>
          </m.div>

          <m.div variants={varFade().inDown}>
            <Button variant="contained" color="primary">
              High School
            </Button>
          </m.div>
          <m.div variants={varFade().inRight}>
            <Button variant="text" color="inherit" sx={{ fontWeight: 500 }}>
              College
            </Button>
          </m.div>
        </Stack>

        <Box sx={{ mt: 10 }}>
          <Grid container spacing={5}>
            {LESSON_LIST.map((item, index) => (
              <Grid key={index} item lg={3} md={4} sm={6} xs={12}>
                <CardStandard title={item.title} description={item.description} image={item.image} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box sx={{ mt: 5 }}>
          <Button component={m.div} variants={varFade().inRight} variant="contained" color="primary" size="large">
            Visit More Classes
          </Button>
        </Box>
      </Container>
    </RootStyle>
  );
}
