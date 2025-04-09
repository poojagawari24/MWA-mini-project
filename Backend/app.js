import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./src/utils/db.js";
const app = express();
app.use(express.json()); // Parses JSON data
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data
dotenv.config();
const PORT = process.env.PORT || 3000;
import User from "./src/models/User.js";
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, //this will allow the backend to send  cookies and authorisation headers
  })
);

app.get("/", async (req, res) => {
  try {
    let users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    console.log(`Error in Get users route`, err);
    res.status(400).send(`Error in get route!`);
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    console.log(`Inside update users route!!`);
    const userId = req.params.id;
    const updatedData = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    // console.log(`Inside update users route!!`);
    console.log(`User:${updatedUser}`);
    res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    let id = req.params.id
    const deletedItem = await User.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    console.log(`Inside delete route!`);
    res.json({ message: "Item deleted", deletedItem });
  } 
  catch (err) 
  {     
    res.status(500).json({ message: 'Error deleting item', err });
  }
});
app.post("/add",async(req,res)=>{
    try{

      let newUser = req.body;
      console.log(newUser);
      let l =req.body.location;
      let q = `https://nominatim.openstreetmap.org/search?q=${l}&format=json&limit=1`;
      // console.log(`api:${q}`);
       const response = await fetch(q);
 
         if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
         }
        const data = await response.json();
        let { lat, lon } = data[0]; // Get the first result's coordinates
     //   console.log(`Type : ${typeof(lat)}`);
     //   console.log(`float Parsed values : ${parseFloat(lon) }, ${ parseFloat(lat) }`);
       lon = parseFloat(lon);
       lat = parseFloat(lat);
      // console.log(typeof(lon)); 
       let geometry = {
         type: "Point",
         coordinates: [parseFloat(lon), parseFloat(lat)] // Longitude, Latitude
       };
       newUser.geometry = geometry;
       console.log(newUser);
       const user = new User(newUser);
       await user.save(); 
       res.status(201).json(user);
    }
    catch(err){
        console.log(`Error in add user route`);
        res.status(500).json({ message: "User can't be added." });
    }
})
app.listen(PORT, () => {
  console.log(`Server Listening on Port no: ${PORT}`);
  connectDB();
});
