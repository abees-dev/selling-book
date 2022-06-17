// @mui
import { Subscribe } from '@/components/subscribe-section';
import { styled } from '@mui/material/styles';
// components
import Page from '../components/Page';
// sections
import {
  HomeHero,
  HomeIntroduce,
  HomeRegisterCourse,
  HomeMentor,
  HomeStandardClass,
  // HomeAdvertisement,
  // HomeLookingFor,
  // HomePricingPlans,
  // HomeCleanInterfaces,
} from '../sections/home';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
  height: '100%',
}));

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <Page title="Course application">
      <RootStyle>
        <HomeHero />
        <ContentStyle>
          <HomeIntroduce />

          <HomeStandardClass />

          <HomeRegisterCourse />

          <HomeMentor />
          <Subscribe />

          {/* <HomeCleanInterfaces />

          <HomePricingPlans />

          <HomeLookingFor /> */}

          {/* <HomeAdvertisement /> */}
        </ContentStyle>
      </RootStyle>
    </Page>
  );
}
