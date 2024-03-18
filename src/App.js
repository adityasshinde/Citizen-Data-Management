// App.js
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CitizensTable from './components/CitizensTable';
import AddEditCitizen from './components/AddCitizenDialog';
import { useGetCitizensQuery } from './store/api/citizensApi';
import { getCitizens } from './store/slices/citizensSlice';
import Loader from './components/Loader';
import { Alert } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  const dispatch = useDispatch();
  const { data: citizens = [],isLoading,isFetching, isError,refetch } = useGetCitizensQuery();
  useEffect(() => {
    dispatch(getCitizens());
  }, [dispatch,citizens]);

  if (isLoading) return <Loader />;
  if (isFetching) return <Loader message='Refreshing table please wait...' />;
  if (isError) return <Alert variant='filled' severity="error">Error while loading data</Alert>;

  return (
    <div style={{padding:'2rem', fontFamily: "Plus Jakarta Sans, sans-serif"}}>
      <h1>Citizen Management System</h1>
      <CitizensTable data={citizens} refresh={()=>{refetch()}} />
      <ToastContainer/>
    </div>
  );
}

export default App;
