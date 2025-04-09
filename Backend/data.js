
import dotenv from "dotenv";
dotenv.config();
import mongoose from 'mongoose'
import { connectDB } from "./src/utils/db.js";
import User from "./src/models/User.js";


const users = [
  {
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "profilepic": "https://img.freepik.com/premium-photo/adorable-female-manager-character-cute-girl-supervisor-illustration-cartoon-office-manager-young_980716-79710.jpg",
    "isAdmin": false,
    "location": "New York, USA",
    "description": "Experienced project manager specializing in team leadership and agile methodologies.",
    "geometry": {
      "type": "Point",
      "coordinates": [-74.006, 40.7128]
    }
  },
  {
    "name": "Bob Smith",
    "email": "bob@example.com",
    "profilepic": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5YtAt7SHNZ2FMwNh5euVglt_Zu9DymUpXhg&s",
    "isAdmin": true,
    "location": "San Francisco, USA",
    "description": "Tech entrepreneur and software engineer with expertise in cloud computing and AI solutions.",
    "geometry": {
      "type": "Point",
      "coordinates": [-122.4194, 37.7749]
    }
  },
  {
    "name": "Charlie Davis",
    "email": "charlie@example.com",
    "profilepic": "https://png.pngtree.com/png-vector/20201224/ourlarge/pngtree-customer-service-girl-smile-service-business-formal-original-png-image_2592887.jpg",
    "isAdmin": false,
    "location": "London, UK",
    "description": "Customer success specialist with a passion for enhancing client engagement and satisfaction.",
    "geometry": {
      "type": "Point",
      "coordinates": [-0.1276, 51.5074]
    }
  },
  {
    "name": "Ethan Wright",
    "email": "ethan@example.com",
    "profilepic": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQms5cjTuruILQJIqMIisdpsoz_J0V2vhlaF-y7FmYb5bXSBspPNFeyfpBhBtAM75oEPzA&usqp=CAU",
    "isAdmin": true,
    "location": "Sydney, Australia",
    "description": "Cybersecurity analyst with a strong background in network security and threat intelligence.",
    "geometry": {
      "type": "Point",
      "coordinates": [151.2093, -33.8688]
    }
  }
];
  const seedDatabase = async () => {
    try {
    console.log("MongoDB URL being used:", process.env.MONGO_URL);
      const res = await connectDB();
      console.log(`Wheter connected to the db or not:`,res);
      await User.deleteMany({});
      await User.insertMany(users);
      console.log("Database seeded successfully");
    } catch (error) {
      console.error("Error seeding database:", error);
    }
  };
  
  // Call the function
  seedDatabase();