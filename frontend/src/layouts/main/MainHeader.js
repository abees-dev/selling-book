import { useLocation } from 'react-router-dom';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Button, AppBar, Toolbar, Container, Stack } from '@mui/material';

// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
import useResponsive from '../../hooks/useResponsive';
// utils
import cssStyles from '../../utils/cssStyles';
// config
import { HEADER } from '../../config';
// components
import Logo from '../../components/Logo';
import Label from '../../components/Label';
//
import MenuDesktop from './MenuDesktop';
import MenuMobile from './MenuMobile';
import navConfig from './MenuConfig';
import Iconify from '@/components/Iconify';
import CartPopover from './CartPopover';

// ----------------------------------------------------------------------

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: HEADER.MOBILE_HEIGHT,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('md')]: {
    height: HEADER.MAIN_DESKTOP_HEIGHT,
  },
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8,
}));

// ----------------------------------------------------------------------

export default function MainHeader() {
  const isOffset = useOffSetTop(HEADER.MAIN_DESKTOP_HEIGHT);

  const theme = useTheme();

  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'md');

  const isHome = pathname === '/';

  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: 'transparent' }}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            ...cssStyles(theme).bgBlur(),
            height: { md: HEADER.MAIN_DESKTOP_HEIGHT - 16 },
          }),
        }}
      >
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Logo />

          <Label color="info" sx={{ ml: 1 }}>
            v3.3.0
          </Label>
          <Box sx={{ flexGrow: 1 }} />

          {isDesktop && <MenuDesktop isOffset={isOffset} isHome={isHome} navConfig={navConfig} />}

          <Stack
            direction="row"
            spacing={2}
            sx={{
              ...(isHome && { color: 'common.white' }),
              ...(isOffset && { color: 'text.primary' }),
            }}
          >
            <CartPopover />
            <Button
              color="inherit"
              endIcon={<Iconify icon="codicon:account" sx={{ color: (theme) => theme.palette.primary.main }} />}
            >
              my account
            </Button>
          </Stack>

          {!isDesktop && <MenuMobile isOffset={isOffset} isHome={isHome} navConfig={navConfig} />}
        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}