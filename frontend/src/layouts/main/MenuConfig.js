// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
};

const menuConfig = [
  {
    title: 'Home',
    icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
    path: '/',
  },
  {
    title: 'Shop',
    path: '/book-shop',
  },
  {
    title: 'For Kindergarten',
    path: '/for-kindergarten',
  },
  {
    title: 'For High School',
    path: '/for-hight-school',
  },
  {
    title: 'For College',
    path: '/for-college',
  },
  {
    title: 'For Courses',
    path: '/for-courses',
  },
];

export default menuConfig;
