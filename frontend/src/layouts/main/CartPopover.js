// import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import {
  Box,
  List,
  Badge,
  Button,
  Divider,
  Typography,
  ListItemText,
  ListItemButton,
  Card,
  Stack,
  CardMedia,
} from '@mui/material';
// utils
// components
import Scrollbar from '../../components/Scrollbar';
import MenuPopover from '../../components/MenuPopover';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { styled } from '@mui/system';
import { useRecoilValue } from 'recoil';
import orderBookAtom from '@/recoils/oderBookAtom';
import { Link } from 'react-router-dom';
import EmptyContent from '@/components/EmptyContent';

// ----------------------------------------------------------------------

export default function CartPopover() {
  const [open, setOpen] = useState(null);

  const orderState = useRecoilValue(orderBookAtom);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <Button
        color="inherit"
        onClick={handleOpen}
        sx={{ fontWeight: 500 }}
        endIcon={
          <Badge badgeContent={orderState ? orderState.length : 0} color="error">
            <LocalMallOutlinedIcon color="primary" fontSize="small" />
          </Badge>
        }
      >
        Cart
      </Button>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{ width: 360, p: 0, mt: 1.5, ml: 0.75 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Order list</Typography>
          </Box>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' }, maxHeight: 600 }}>
          {orderState.length > 0 ? (
            <List disablePadding>
              {orderState?.map((order) => (
                <OrderItem key={order._id} order={order} />
              ))}
            </List>
          ) : (
            <EmptyContent title="No order selected" />
          )}
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple component={Link} to="/book-shop/checkout" onClick={handleClose}>
            Check Out
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}

// ----------------------------------------------------------------------

function OrderItem({ order }) {
  const { title, price, author, imageUrl, quantity } = order;
  const TitleStyle = styled(Typography)(({ theme }) => ({
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    flex: 1,
  }));

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
      }}
    >
      <Card sx={{ minWidth: 60, minHeight: 60, mr: 2, p: 0.5, borderRadius: 0.5 }}>
        <CardMedia component="img" height={60} src={imageUrl} />
      </Card>
      <ListItemText>
        <Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={3}>
            <TitleStyle variant="subtitle2">{title}</TitleStyle>
            <Typography variant="subtitle2" color="error">
              ${price}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 0.5 }}>
            <Typography variant="caption">By {author}</Typography>
            {quantity && (
              <Typography variant="caption">
                quantity:
                <Typography variant="caption" color="error" sx={{ ml: 1 }}>
                  {quantity}
                </Typography>
              </Typography>
            )}
          </Stack>
        </Stack>
      </ListItemText>
    </ListItemButton>
  );
}
