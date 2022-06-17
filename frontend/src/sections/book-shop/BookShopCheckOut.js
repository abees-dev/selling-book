import { IconButtonAnimate } from '@/components/animate';
import Iconify from '@/components/Iconify';
import Image from '@/components/Image';
import { TableHeadCustom, TableNoData } from '@/components/table';
import useTable from '@/hooks/useTable';
import orderBookAtom from '@/recoils/oderBookAtom';
import userAtom from '@/recoils/userAtom';
import {
  Button,
  Card,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableRow,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import axios from '@/utils/axios';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(15),
}));

const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'price', label: 'Price', align: 'center' },
  { id: 'quantity', label: 'Quantity', align: 'center' },
  { id: 'total', label: 'Total', align: 'center' },
  { id: '' },
];

const BookShopCheckOut = () => {
  const { onSort } = useTable();

  const { user } = useRecoilValue(userAtom);
  const [orderState, setOrderState] = useRecoilState(orderBookAtom);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const total = orderState.reduce((prev, current) => prev + current.price * current.quantity, 0);
    setTotal(total);
  }, [orderState]);

  const handleDeleteRow = (id) => {
    setOrderState((prev) => prev.filter((item) => item._id !== id));
  };

  const handleCheckOut = async () => {
    const books = orderState.map((book) => book._id);

    try {
      await axios.post('/api/order/createOrder', {
        users: user._id,
        books: books,
        total: total,
      });
      setOrderState([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Typography variant="h4">Name</Typography>
        <Card sx={{ py: 3 }}>
          <TableContainer>
            <Table>
              <TableHeadCustom headLabel={TABLE_HEAD} onSort={onSort} />
              <TableBody>
                {orderState?.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                      <Image src={item.imageUrl} sx={{ width: 60 }} />
                      <Typography variant="subtitle1" sx={{ ml: 3 }}>
                        {item.title}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">${item.price}</TableCell>
                    <TableCell align="center">{item.quantity}</TableCell>
                    <TableCell align="center">${item.price * item.quantity}</TableCell>
                    <TableCell align="right">
                      <IconButtonAnimate color="error" onClick={() => handleDeleteRow(item._id)}>
                        <Iconify icon="fluent:delete-48-filled" />
                      </IconButtonAnimate>
                    </TableCell>
                  </TableRow>
                ))}
                <TableNoData isNotFound={false} />
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell component="th" scope="row" colSpan={5}>
                    <Stack direction="row" justifyContent="flex-end" spacing={1.5} sx={{ mr: 2 }}>
                      <Typography variant="subtitle1">Totals:</Typography>
                      <Typography variant="subtitle2" color="error">
                        $ {total}
                      </Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Card>
        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <Button variant="contained" size="large" sx={{ px: 5 }} onClick={handleCheckOut}>
            Order
          </Button>
        </Stack>
      </Container>
    </RootStyle>
  );
};

export default BookShopCheckOut;
