import React from 'react'
import { useState,useEffect } from 'react'
import { createContext, useContext } from "react";
import Card from './Card.jsx'
import Header from './Header.jsx'
import axios from '../utils/axios.js'

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Checkbox, FormControlLabel } from "@mui/material";
export const AdminContext = createContext();
const Home = () => {
  
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
    profilepic: "",
    isAdmin: false,
    location: "",
  });
  // function handleClick(e){
  //   const { name, value, type, checked } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: type === "checkbox" ? checked : value, // Handle checkbox for isAdmin
  //   });
  // }
const handleDeleteSuccess = (id) => {
  setUsers(users.filter(user => user._id !== id)); // Remove user from list 
};
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/"); // Update the URL to match your backend
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
    fetchUsers();
  },[]);

  const handleClick = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/add", formData);
      setUsers([...users, response.data]);
      const res = await axios.get("/");  // Refetch updated users
      console.log(res.data);
      setUsers(res.data);
     // setUsers(response.data); // Update state with latest users
      handleClose();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };
  return (
   
      <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
      <div>
       <Header className='mt-10' />
       <div className="mt-5 flex justify-center">
        {isAdmin && <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300" onClick={handleClick}>
          Add New User
        </button>
        }
      </div>

        <div className='w-full max-w-6xl mx-auto flex flex-wrap gap-4 justify-center mt-6'>
          {
            users.map((user)=>(
              <Card key={user._id} user={user} handleDeleteSuccess={handleDeleteSuccess}/>
            ))
          }
        </div>
      

        <Dialog open={openModal} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>Add New User</DialogTitle>
          <DialogContent>
            <TextField label="Name" name="name" fullWidth margin="dense" required onChange={handleChange} />
            <TextField label="Email" name="email" fullWidth margin="dense" required onChange={handleChange} />
            <TextField label="Description" name="description" fullWidth margin="dense" required onChange={handleChange} />
            <TextField label="Profile Picture URL" name="profilepic" fullWidth margin="dense" onChange={handleChange} />
            <TextField label="Location" name="location" fullWidth margin="dense" required onChange={handleChange} />
            <FormControlLabel control={<Checkbox name="isAdmin" checked={formData.isAdmin} onChange={handleChange} />} label="Admin User" />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">Cancel</Button>
            <Button onClick={handleSubmit} color="primary">Add User</Button>
          </DialogActions>
        </Dialog>

    </div>  
    </AdminContext.Provider>        
  )
}

export default Home