import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Stack } from '@mui/material';
// components

// ----------------------------------------------------------------------

const LinkStyle = styled(Link)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.primary,
  marginRight: theme.spacing(5),
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
  '&:hover': {
    opacity: 0.48,
    textDecoration: 'none',
  },
}));

// ----------------------------------------------------------------------

MenuDesktop.propTypes = {
  isHome: PropTypes.bool,
  isOffset: PropTypes.bool,
  navConfig: PropTypes.array,
};

export default function MenuDesktop({ isOffset, isHome, navConfig }) {
  return (
    <Stack direction="row">
      {navConfig.map((link) => (
        <MenuDesktopItem key={link.title} item={link} isOffset={isOffset} isHome={isHome} />
      ))}
    </Stack>
  );
}

// ----------------------------------------------------------------------

IconBullet.propTypes = {
  type: PropTypes.oneOf(['item', 'subheader']),
};

function IconBullet({ type = 'item' }) {
  return (
    <Box sx={{ width: 24, height: 16, display: 'flex', alignItems: 'center' }}>
      <Box
        component="span"
        sx={{
          ml: '2px',
          width: 4,
          height: 4,
          borderRadius: '50%',
          bgcolor: 'currentColor',
          ...(type !== 'item' && { ml: 0, width: 8, height: 2, borderRadius: 2 }),
        }}
      />
    </Box>
  );
}

// ----------------------------------------------------------------------

MenuDesktopItem.propTypes = {
  isHome: PropTypes.bool,
  isOffset: PropTypes.bool,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  item: PropTypes.shape({
    path: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.array,
  }),
};

function MenuDesktopItem({ item, isHome, isOffset }) {
  const { title, path } = item;

  if (title === 'Documentation') {
    return (
      <LinkStyle
        href={path}
        target="_blank"
        rel="noopener"
        sx={{
          ...(isHome && { color: 'common.white' }),
          ...(isOffset && { color: 'text.primary' }),
        }}
      >
        {title}
      </LinkStyle>
    );
  }

  return (
    <LinkStyle
      to={path}
      component={RouterLink}
      end={path === '/'}
      sx={{
        ...(isHome && { color: 'common.white' }),
        ...(isOffset && { color: 'text.primary' }),
        '&.active': {
          color: 'primary.main',
        },
      }}
    >
      {title}
    </LinkStyle>
  );
}
