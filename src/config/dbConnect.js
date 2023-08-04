import mongoose from "mongoose";

mongoose.connect("mongodb+srv://marcellsa:mongodb12345@myfirstcluster.eff6uhg.mongodb.net/alura-node-express");

let db = mongoose.connection;

export default db;