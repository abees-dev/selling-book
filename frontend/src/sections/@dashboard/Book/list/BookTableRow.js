import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Avatar, TableRow, TableCell, Typography, MenuItem } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';

// ----------------------------------------------------------------------

UserTableRow.propTypes = {
  row: PropTypes.object,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function UserTableRow({ row, onEditRow, onDeleteRow }) {
  const { title, unit, price, author, imageUrl } = row;

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={title} src={imageUrl} sx={{ mr: 2 }} />
        <Typography variant="subtitle2" noWrap>
          {title}
        </Typography>
      </TableCell>

      <TableCell align="left">{unit}</TableCell>

      <TableCell align="left">{price}$</TableCell>

      <TableCell align="left">{author}</TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                Delete
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Edit
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
