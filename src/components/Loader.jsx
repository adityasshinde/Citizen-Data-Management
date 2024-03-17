import { CircularProgress } from '@mui/material';
import React from 'react';

const Loader = ({message,color}) => {
  return (
    <div style={{display:'flex',flexDirection:'column',marginTop:'5rem',alignItems:'center',justifyContent:'center'}}>
      <CircularProgress/>
      <p className="mt-4 font-semibold" style={{color:color?color:'inherit'}}>{message? message:'Loading, please wait....'}</p>
    </div>
  );
};

export default Loader;
