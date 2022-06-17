import PropTypes from 'prop-types';
import { Stack, InputAdornment, TextField, MenuItem } from '@mui/material';
import Iconify from '@/components/Iconify';
// components

// ----------------------------------------------------------------------

BookShopSearch.propTypes = {
  optionsRole: PropTypes.arrayOf(PropTypes.string),
};

export default function BookShopSearch({ optionsRole }) {
  return (
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: 2.5 }}>
      <TextField
        fullWidth
        placeholder="Search books..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        fullWidth
        select
        label="Book Type"
        value="all books"
        SelectProps={{
          MenuProps: {
            sx: { '& .MuiPaper-root': { maxHeight: 260 } },
          },
        }}
        sx={{
          maxWidth: { sm: 240 },
          textTransform: 'capitalize',
        }}
      >
        <MenuItem
          value="all books"
          sx={{
            mx: 1,
            my: 0.5,
            borderRadius: 0.75,
            typography: 'body2',
            textTransform: 'capitalize',
          }}
        >
          All Book
        </MenuItem>
      </TextField>
    </Stack>
  );
}
