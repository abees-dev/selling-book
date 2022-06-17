// hooks
import userAtom from '@/recoils/userAtom';
import { useRecoilValue } from 'recoil';
// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const userState = useRecoilValue(userAtom);

  const { user } = userState;

  return (
    <Avatar
      src={user?.imageUrl}
      alt={user?.fullName}
      color={user?.imageUrl ? 'default' : createAvatar(user?.fullName).color}
      {...other}
    >
      {createAvatar(user?.fullName).name}
    </Avatar>
  );
}
