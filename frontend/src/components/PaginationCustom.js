import { Button, Pagination, Stack, styled, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import Iconify from './Iconify';

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(5),
  marginBottom: theme.spacing(2),
}));

const PaginationStyle = styled(Pagination)(({ theme }) => ({
  '& .MuiPaginationItem-root': {
    // color: '#fff',
    borderRadius: 4,
  },
  '& .MuiPaginationItem-previousNext': {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
  },
  '& .Mui-disabled': {
    color: theme.palette.common.black,
  },
}));

const PaginateCustom = ({ paginate, onChange, onPrevPage }) => {
  const { currentPage, totalPages } = paginate;

  return (
    <RootStyle>
      <Stack direction="row" spacing={2} alignItems="center">
        <PaginationStyle
          size="large"
          count={totalPages}
          page={currentPage}
          variant="text"
          siblingCount={2}
          onChange={onChange}
          color="primary"
        />
      </Stack>
    </RootStyle>
  );
};

PaginateCustom.propTypes = {
  paginate: PropTypes.object,
  onNextPage: PropTypes.func,
  onPrevPage: PropTypes.func,
};

export default PaginateCustom;
