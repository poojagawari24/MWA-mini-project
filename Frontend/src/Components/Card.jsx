import React from 'react'
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Map from './Map.jsx'
import Update from './Update.jsx'
import { useState , useContext} from 'react';
import { AdminContext } from './Home.jsx'; 
import axios from '../utils/axios.js'
// import {MapPin , BookUser} from 'lucide-react'

const Card = ({user,handleDeleteSuccess}) => {
  const { isAdmin } = useContext(AdminContext);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState(user); 


  const handleClickOpen = () => 
  {
    setOpen(true);
    setTimeout(() => {
      document.getElementById("upd")?.focus();
    }, 0);
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setTimeout(() => {
      document.querySelector('[data-dialog-trigger]')?.focus();
    }, 0);
  };
  
  const handleEdit = () => {
    setEditMode(true);  
  };
  async function handleDelete()
  {     
    try{
      const res = await axios.delete(`/delete/${user._id}`);
      setOpen(false);//inorder to turn off the modal dailogue box
      setEditMode(false);
      handleDeleteSuccess(user._id);
      // document.getElementById("focus-target")?.focus();
    }
    catch(err){
       console.log(`Error in delete user route!`);
    }
     
  }
  const handleUpdateSuccess = (updatedData) => {
    setUserData(updatedData); // Correctly update state
    setEditMode(false);
  };
  return (
   <>
   
     <div className='card h-100 w-85 border-2 rounded-xl bg-white p-4 box-border m-3'>
      <img src={userData.profilepic} alt="profilepic" className='w-full h-48 object-cover object-top p-1 rounded-xl '></img>
      <h4 className='text-2xl font-size'>{userData.name}</h4>
      <p className='description m-1'>{userData.description}</p>
            <Button variant="contained" color="primary" className="p-2 -mb-2" onClick={handleClickOpen}   data-dialog-trigger>
                Details
            </Button>
      </div>
      <Dialog open={open} onClose={handleClose}  maxWidth="lg" fullWidth inert={!open}>
        <DialogTitle id='user-dialog-title'>{userData.name}'s Details</DialogTitle>
        <DialogContent>
        <div className='flex flex-row gap-4 '>
            <div className='flex-1'>
              <img src={userData.profilepic} className='w-60 h-60 rounded-lg m-auto' alt='User Profile' />
              {editMode ? <Update user={userData} 
  onCancel={() => setEditMode(false)} 
  onUpdateSuccess={handleUpdateSuccess} /> :
                <Typography className='mt-4'>
                  <strong>Email:</strong> {userData.email} <br />
                  <strong>Address:</strong> {userData.location} <br />
                  <strong>Description:</strong> {userData.description} <br />
                </Typography>
              }
            </div>
            {!editMode && <div className='flex-1'>
              <h2>Location</h2>
              <Map geometry={userData.geometry} location={userData.location} />
            </div>
          }
        </div>
          </DialogContent>
        
        <DialogActions>
        {isAdmin && !editMode && <Button onClick={handleEdit} color='primary' id='upd'>Update</Button>}
        {isAdmin && !editMode && <Button onClick={handleDelete} color='primary'>Delete</Button>}
          <Button onClick={handleClose} color='primary'>Close</Button>
        </DialogActions>
      </Dialog>
   </>
  )
}

export default Card