import express from 'express';
import mongoose from'mongoose';
import routes from './Routes/user-routes.js';

const app=express();
const port = 4000;

app.use(express.json());
app.use('/user',routes);

mongoose.connect("mongodb+srv://subinsubi7012:x9XZ5hkvecyUtSEv@cluster0.4juendb.mongodb.net/PRODUCTSELLING?retryWrites=true&w=majority&appName=Cluster0")
   .then(() => {
      app.listen(port,() => {
         console.log('connected at' + port)
      })
   })
   .catch((error) => {
      console.error("Failed to connect to MongoDB:", error);
   });