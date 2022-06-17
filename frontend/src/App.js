// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import Settings from './components/settings';
import { ChartStyle } from './components/chart';
import ScrollToTop from './components/ScrollToTop';
import { ProgressBarStyle } from './components/ProgressBar';
import NotistackProvider from './components/NotistackProvider';
import ThemeColorPresets from './components/ThemeColorPresets';
import ThemeLocalization from './components/ThemeLocalization';
import MotionLazyContainer from './components/animate/MotionLazyContainer';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <ThemeColorPresets>
        <ThemeLocalization>
          <NotistackProvider>
            <MotionLazyContainer>
              <ProgressBarStyle />
              <ChartStyle />
              <Settings />
              <ScrollToTop />
              <Router />
            </MotionLazyContainer>
          </NotistackProvider>
        </ThemeLocalization>
      </ThemeColorPresets>
    </ThemeProvider>
  );
}
