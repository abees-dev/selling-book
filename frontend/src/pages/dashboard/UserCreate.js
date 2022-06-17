// @mui
import { Container, Typography } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// sections
import UserNewEditForm from '../../sections/@dashboard/user/UserNewEditForm';

// ----------------------------------------------------------------------

export default function UserCreate({ isEdit, currentUser, onSuccess }) {
  const { themeStretch } = useSettings();

  return (
    <Container maxWidth={themeStretch ? false : 'lg'}>
      <Typography variant="h4" sx={{ my: 2 }}>
        {isEdit ? 'Edit User' : 'Create User'}
      </Typography>
      <UserNewEditForm isEdit={isEdit} currentUser={currentUser} onSuccess={onSuccess} />
    </Container>
  );
}
