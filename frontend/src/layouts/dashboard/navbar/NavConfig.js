// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  user: getIcon('ic_user'),
  product: getIcon('ic_dashboard'),
  books: getIcon('ic_dashboard'),
  dashboard: getIcon('ic_dashboard'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [{ title: 'app', path: '/', icon: ICONS.dashboard }],
  },

  // Products
  {
    subheader: 'products management',
    items: [
      // Product
      {
        title: 'Products',
        path: PATH_DASHBOARD.products.root,
        icon: ICONS.product,
        children: [
          { title: 'books', path: PATH_DASHBOARD.products.books },
          { title: 'Course', path: PATH_DASHBOARD.products.course },
        ],
      },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'user management',
    items: [
      // USER
      {
        title: 'user ',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'list', path: PATH_DASHBOARD.user.list },
          { title: 'profile', path: PATH_DASHBOARD.user.profile },
          { title: 'account', path: PATH_DASHBOARD.user.account },
        ],
      },
    ],
  },
];

export default navConfig;
