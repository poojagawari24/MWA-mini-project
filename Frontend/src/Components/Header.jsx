import React, { useContext, useState } from "react";
import { AdminContext } from "./Home.jsx"; // Import context
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const Header = () => {
  const { isAdmin, setIsAdmin } = useContext(AdminContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [password, setPassword] = useState("");

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    if (password === "admin123") { // Replace with real auth logic
      setIsAdmin(true);
      handleClose();
    } else {
      alert("Invalid password!");
    }
  };

  return (
    <div className="bg-[#EBF4F6] h-[15vh] w-full flex items-center px-4">
      <div>
      <h2 className="text-6xl font-extrabold p-4">ProfileHub</h2>
      <p className="text-xl ml-4">Welcome to the user profile management platform</p>
      </div>
      {/* Admin Access Button */}
      <div className="ml-auto text-xl font-bold cursor-pointer" onClick={handleOpen}>
        {isAdmin ? "Admin Panel" : "Admin Access"}
      </div>

      {/* Popover for Admin Login */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <div className="p-4 flex flex-col gap-3">
          <h3 className="text-lg font-bold">Admin Login</h3>
          <TextField
            type="password"
            label="Enter Password"
            variant="outlined"
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
        </div>
      </Popover>
    </div>
  );
};

export default Header;
