import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from '../utils/axios.js';
import Card from './Card.jsx'

const UpdateForm = ({ user, onCancel, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    location: user.location,
    description: user.description
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`/update/${user._id}`, formData);
      //console.log(res);
      const updatedUser = res.data.user;
      //console.log(updatedUser);
      alert('Profile updated successfully!');
      onUpdateSuccess(updatedUser);
      onCancel(); 
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div >
      <h2>Update Details</h2>
      <TextField label='Name' name='name' value={formData.name} onChange={handleChange} fullWidth margin='dense' />
      <TextField label='Email' name='email' value={formData.email} onChange={handleChange} fullWidth margin='dense' />
      <TextField label='Address' name='location' value={formData.location} onChange={handleChange} fullWidth margin='dense' />
      <TextField label='Description' name='description' value={formData.description} onChange={handleChange} fullWidth margin='dense' multiline rows={3} />
      <div className='flex justify-end mt-4'>
        <Button onClick={handleUpdate} color='primary'>Save</Button>
        <Button onClick={onCancel} color='secondary'>Cancel</Button>
      </div>
    </div>
  );
};

export default UpdateForm;
