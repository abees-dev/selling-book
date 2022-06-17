import { PageHero } from '@/components/hero-pages';
import Page from '@/components/Page';
import CourseOther from '@/sections/course/CourseOther';
import CourseStandardClass from '@/sections/course/CourseStandardClass';
import { styled } from '@mui/system';
import React from 'react';

// ----------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({}));

const Courses = () => {
  return (
    <Page title="Course">
      <RootStyle>
        <PageHero
          title="Eduvi Courses"
          subtitle="For all standards"
          image="https://res.cloudinary.com/abeesdev/image/upload/v1655478007/Logo/rexr8py4x4brf3x9rk9o.png"
        />
        <CourseStandardClass />
        <CourseOther />
      </RootStyle>
    </Page>
  );
};

export default Courses;
