import { useEffect, useState } from 'react';
// @mui
import {
  Box,
  Tab,
  Tabs,
  Card,
  Table,
  Switch,
  Button,
  Divider,
  TableBody,
  Container,
  TableContainer,
  TablePagination,
  FormControlLabel,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useTabs from '../../hooks/useTabs';
import useSettings from '../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../hooks/useTable';
// _mock_
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { TableEmptyRows, TableHeadCustom, TableNoData } from '../../components/table';
// sections
import { UserTableToolbar, UserTableRow } from '../../sections/@dashboard/user/list';
import axios from '@/utils/axios';
import { useSnackbar } from 'notistack';
import { DialogAnimate } from '@/components/animate';
import UserCreate from './UserCreate';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = ['all', 'active', 'banned'];

const ROLE_OPTIONS = [
  'all',
  'ux designer',
  'full stack designer',
  'backend developer',
  'project manager',
  'leader',
  'ui designer',
  'ui/ux designer',
  'front end developer',
  'full stack developer',
];

const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'company', label: 'Company', align: 'left' },
  { id: 'role', label: 'Role', align: 'left' },
  { id: 'address', label: 'Address', align: 'left' },
  { id: 'country', label: 'Country', align: 'center' },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function UserList() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //

    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { themeStretch } = useSettings();

  const [tableData, setTableData] = useState([]);

  const [filterName, setFilterName] = useState('');

  const [filterRole, setFilterRole] = useState('all');

  const [openDialog, setOpenDialog] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);

  const [isEdit, setIsEdit] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs('all');

  const handleFilterName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleFilterRole = (event) => {
    setFilterRole(event.target.value);
  };

  const deleteSuccess = (id) => {
    setTableData((prev) => prev.filter((item) => item._id !== id));
  };

  const handleDeleteRow = async (id) => {
    try {
      await axios.delete('/api/user/delete', { params: { id: id } });
      deleteSuccess(id);
      enqueueSnackbar('Delete user successfully');
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditRow = (row) => {
    setCurrentUser(row);
    setIsEdit(true);
    setOpenDialog(true);
  };

  const onSuccess = (data, id) => {
    setTableData((prev) => {
      if (id) {
        return prev.map((item) => (item._id === id ? data : item));
      }
      return [...prev, data];
    });
    setOpenDialog(false);
  };

  const handleAddNewRow = (row) => {
    setCurrentUser(null);
    setIsEdit(false);
    setOpenDialog(true);
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterRole,
    filterStatus,
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterRole) ||
    (!dataFiltered.length && !!filterStatus);

  useEffect(() => {
    const getDataUser = async () => {
      try {
        const res = await axios.get('/api/user/getAll');
        console.log(res);
        setTableData(res.data);
      } catch (error) {
        console.log('error', error);
      }
    };
    getDataUser();
  }, []);

  return (
    <Page title="User: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="User List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: 'List' },
          ]}
          action={
            <Button variant="contained" onClick={handleAddNewRow} startIcon={<Iconify icon={'eva:plus-fill'} />}>
              New User
            </Button>
          }
        />
        <DialogAnimate open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md">
          <UserCreate currentUser={currentUser} isEdit={isEdit} onSuccess={onSuccess} />
        </DialogAnimate>
        <Card>
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={filterStatus}
            onChange={onChangeFilterStatus}
            sx={{ px: 2, bgcolor: 'background.neutral' }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab disableRipple key={tab} label={tab} value={tab} />
            ))}
          </Tabs>

          <Divider />

          <UserTableToolbar
            filterName={filterName}
            filterRole={filterRole}
            onFilterName={handleFilterName}
            onFilterRole={handleFilterRole}
            optionsRole={ROLE_OPTIONS}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom order={order} orderBy={orderBy} headLabel={TABLE_HEAD} onSort={onSort} />

                <TableBody>
                  {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <UserTableRow
                      key={row._id}
                      row={row}
                      onDeleteRow={() => handleDeleteRow(row._id)}
                      onEditRow={() => handleEditRow(row)}
                    />
                  ))}

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={dataFiltered.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />

            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label="Dense"
              sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

function applySortFilter({ tableData, comparator, filterName, filterStatus, filterRole }) {
  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData.filter((item) => item.fullName.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
  }

  if (filterStatus !== 'all') {
    tableData = tableData.filter((item) => item.status === filterStatus);
  }

  if (filterRole !== 'all') {
    tableData = tableData.filter((item) => item.role === filterRole);
  }

  return tableData;
}
