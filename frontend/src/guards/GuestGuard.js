import userAtom from '@/recoils/userAtom';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
// hooks
// routes
// ----------------------------------------------------------------------
GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default function GuestGuard({ children }) {
  const userState = useRecoilValue(userAtom);

  const { isAuthenticated } = userState;

  if (isAuthenticated) {
    return <Navigate to={'/'} />;
  }

  return <>{children}</>;
}
