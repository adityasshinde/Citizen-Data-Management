import React, { useState } from 'react';
import { useTable, usePagination, useGlobalFilter, useSortBy } from 'react-table';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import AddCitizenDialog from './AddCitizenDialog';
import EditCitizenDialog from './EditCitizenDialog';
import { useDeleteCitizenMutation } from '../store/api/citizensApi';
import { toast } from 'react-toastify';

const columns = [
  {
    Header: 'First Name',
    accessor: 'firstName',
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
  },
  {
    Header: 'Date of Birth',
    accessor: 'dob',
  },
  {
    Header: 'Gender',
    accessor: 'gender',
  },
  {
    Header: 'Address',
    accessor: 'address',
  },
  {
    Header: 'City',
    accessor: 'city',
  },
  {
    Header: 'State',
    accessor: 'state',
  },
  {
    Header: 'Pincode',
    accessor: 'pincode',
  },
  {
    Header: 'Actions',
    accessor: 'actions',
    Cell: ({ row ,onEdit,onDelete}) => (
      <div style={{width:'180px'}}>
        <Button variant='contained' sx={{ backgroundColor: 'black',
        color: 'white',
        fontWeight: 'bold',
        marginLeft: '1rem',
        textTransform: 'none', 
        '&:hover': {
          backgroundColor: 'black', // Adjust hover background color if needed
        },}}
        onClick={() => onEdit(row.original)}
        >Edit</Button>
        <Button variant='contained' sx={{ backgroundColor: 'red',
        color: 'white',
        fontWeight: 'bold',
        marginLeft: '1rem',
        textTransform: 'none', 
        '&:hover': {
          backgroundColor: 'red', // Adjust hover background color if needed
        },}}
        onClick={()=>onDelete(row.original)} >Delete</Button>
      </div>
    ),
  },
];

function CitizensTable({ data,refresh }) {
  const [addCitizenDialog, setAddCitizenDialog] = useState(false);
  const [updateCitizenDialog, setUpdateCitizenDialog] = useState(false);
  const [citizenToEdit, setCitizenEdit] = useState(null);
  const [deleteCitizen,{isLoading:deleteLoading}]=useDeleteCitizenMutation();
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const onEdit = (citizen) => {
    setCitizenEdit(citizen);
    setUpdateCitizenDialog(true);
  };
  const onDelete = async(citizen) => {
    // Open the update dialog
    const result=await deleteCitizen(citizen.id);
    console.log(result);
    toast.success('Citizen deleted successfully',{
      position: 'top-right',
      autoClose: 2000,
    });
    refresh();
  };

  const { pageIndex, globalFilter } = state;

  return (
    <div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
      <input type="text"
        onChange={(e) => setGlobalFilter(e.target.value)}
        value={globalFilter || ''}
        style={{
          width:'250px',
          fontSize: '1rem',
          padding: '10px',
          outline: 'none',
          margin:'1rem 0',
          borderRadius:'8px',
          textDecoration: 'none'
        }}
        placeholder="Search..." />
        <Button variant='contained' sx={{ backgroundColor: 'black',
        color: 'white',
        fontWeight: 'bold',
        marginLeft: '1rem',
        textTransform: 'none', 
        '&:hover': {
          backgroundColor: 'black', // Adjust hover background color if needed
        },}} onClick={setAddCitizenDialog}>+Add</Button>
      </div>
      <AddCitizenDialog open={addCitizenDialog} refresh={refresh} onClose={()=>{setAddCitizenDialog(false)}} />
      <EditCitizenDialog open={updateCitizenDialog} refresh={refresh} onClose={()=>{setUpdateCitizenDialog(false)}} citizen={citizenToEdit} />
      <TableContainer component={Paper} sx={{borderRadius:'16px'}}>
        <Table {...getTableProps()} style={{  borderCollapse: 'collapse'}}>
          <TableHead sx={{bgcolor:'white'}}>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    style={{
                      borderBottom: '1px solid black',
                      background: '#E6EFF1',
                      color:'#585858',
                      padding: '8px 16px',
                      fontWeight:'bold',
                      textAlign: column.id === 'actions' ? 'center' : 'left',
                    }}
                  >
                    {column.render('Header')}
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">No results found</TableCell>
              </TableRow>
            ) : (
              page.map((row) => {
                prepareRow(row);
                return (
                  <TableRow {...row.getRowProps()} style={{ borderBottom: '1px solid black' }}>
                    {row.cells.map((cell) => (
                      <TableCell {...cell.getCellProps()} style={{ padding: '8px 16px' }}>
                        {cell.render('Cell',{ onEdit, onDelete })}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{margin:'1rem 0'}}>
        <Button onClick={() => previousPage()} sx={{textTransform:'none'}} disabled={!canPreviousPage}>
          Previous
        </Button>
        <span style={{margin:'0 5px'}}>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <Button sx={{textTransform:'none'}} onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default CitizensTable;
