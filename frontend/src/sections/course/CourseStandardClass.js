import { CardStandard } from '@/components/standard';
import { MotionViewport } from '@/components/animate';
import TabButton from '@/components/TabButton';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { Container, styled } from '@mui/system';
import React, { useState } from 'react';

// ------------------------------------------------------------
const LIST_BUTTON = [
  {
    title: 'all courses',
    type: 'all courses',
  },
  {
    title: 'Kindergarten',
    type: 'Kindergarten',
  },
  {
    title: 'High School',
    type: 'High School',
  },
  {
    title: 'College',
    type: 'College',
  },
  {
    title: 'Computer',
    type: 'Computer',
  },
  {
    title: 'Science',
    type: 'Science',
  },
  {
    title: 'Engineering',
    type: 'Engineering',
  },
];

const STANDARD_LIST = [
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
  {
    image: 'https://res.cloudinary.com/abeesdev/image/upload/v1655222998/Logo/i9jajmi50zgdf2w0u7gv.png',
    title: 'Standard Eight',
    description: 'Standard 8 Course from NCERT Solutions help students to understand',
  },
  {
    image: 'https://res.cloudinary.com/abeesdev/image/upload/v1655222998/Logo/i9jajmi50zgdf2w0u7gv.png',
    title: 'Standard Eight',
    description: 'Standard 8 Course from NCERT Solutions help students to understand',
  },
  {
    image: 'https://res.cloudinary.com/abeesdev/image/upload/v1655222998/Logo/i9jajmi50zgdf2w0u7gv.png',
    title: 'Standard Eight',
    description: 'Standard 8 Course from NCERT Solutions help students to understand',
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(5),
}));

const CourseStandardClass = () => {
  const [buttonType, setButtonType] = useState('all courses');
  return (
    <RootStyle>
      <Container component={MotionViewport} maxWidth="lg">
        <Stack direction="row" justifyContent="space-between">
          {LIST_BUTTON.map((item, index) => (
            <TabButton
              key={index}
              title={item.title}
              size="medium"
              sx={{ px: 3 }}
              color={buttonType === item.type ? 'primary' : 'inherit'}
            />
          ))}
          <Button variant="contained" color="inherit" sx={{ fontWeight: 500, px: 3, color: 'primary.main' }}>
            More Course
          </Button>
        </Stack>
        <Box sx={{ mt: 5 }}>
          <Typography variant="h5" sx={{ my: 3 }}>
            Standard Classes
          </Typography>
          <Grid container spacing={5}>
            {STANDARD_LIST.map((item, index) => (
              <Grid key={index} item lg={3} md={4} sm={6} xs={12}>
                <CardStandard image={item.image} title={item.title} description={item.description} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </RootStyle>
  );
};

export default CourseStandardClass;
