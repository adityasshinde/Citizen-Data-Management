import React, { useState } from 'react';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { useCreateCitizenMutation } from '../store/api/citizensApi';

function AddCitizenDialog({ open, onClose,refresh }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [createCitizenMutation,{isLoading}]=useCreateCitizenMutation();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAdd = async(e) => {
    e.preventDefault();
    // Perform validation if needed
    const { firstName, lastName, dob, gender, address, city, state, pincode } = formData;
    if (!firstName || !lastName || !dob || !gender || !address || !city || !state || !pincode) {
      // Show toast notification for missing fields
      toast.error('Please fill in all fields.', { position: 'top-right', autoClose: 2000 });
      return;
    }
    const jsonData = JSON.stringify(formData);
    console.log(jsonData);
    const result=await createCitizenMutation(jsonData);
    console.log(result);
    toast.success('Citizen added successfully.', { position: 'top-right', autoClose: 2000});
    onClose();
    refresh();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{fontWeight:'bold'}}>Add Citizen</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="firstName"
          label="First Name"
          type="text"
          fullWidth
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="lastName"
          label="Last Name"
          type="text"
          fullWidth
          value={formData.lastName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="dob"
          label="Date of Birth"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={formData.dob}
          onChange={handleChange}
        />
        <FormControl fullWidth margin="dense">
        <InputLabel>Gender</InputLabel>
        <Select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          sx={{ width: '100%' }}
          label="Gender"
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
      </FormControl>
        <TextField
          margin="dense"
          name="address"
          label="Address"
          type="text"
          fullWidth
          value={formData.address}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="city"
          label="City"
          type="text"
          fullWidth
          value={formData.city}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="state"
          label="State"
          type="text"
          fullWidth
          value={formData.state}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="pincode"
          label="Pincode"
          type="text"
          fullWidth
          value={formData.pincode}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{color:'black', textTransform: 'none', }}>
          Cancel
        </Button>
        <Button variant='contained' disabled={isLoading} sx={{ backgroundColor: 'black',
        color: 'white',
        fontWeight: 'bold',
        position: 'relative',
        textTransform: 'none', 
        '&:hover': {
          backgroundColor: 'black', // Adjust hover background color if needed
        },}} onClick={handleAdd}>
          {isLoading && "Processing..."}
      {!isLoading && 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddCitizenDialog;
