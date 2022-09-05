// create an express app
const express = require("express");
const mongoose = require('mongoose');
const { MongoClient } = require("mongodb");
const uri ="mongodb+srv://user:afdhal10@cluster4.sduog7h.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


const app = express();
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


const stuffRoutes = require('./routes/stuff');
//const userRoutes=require('./routes/user');
const customerRoutes=require('./routes/customer');
//app.post('/');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.status(200).json({
    status:"Server is running..."
  });
})
app.use('/api/stuff',stuffRoutes);
//app.use('/api/auth',userRoutes);
app.use('/api/auth',customerRoutes);

// start the server listening for requests
app.listen(process.env.PORT || 3001, 
	() => console.log("Server is running..."));

  module.exports=app;


