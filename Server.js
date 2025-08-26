// const express = require('express')
// const cors = require('cors')
// const mongoose = require('mongoose')
// const articleRoutes = require('./routes/articleRoutes')
// const newsletterRoutes = require('./routes/newsletterRoutes.js')
// const dotenv = require('dotenv')

// dotenv.config();
// //cloudinary debugging
// // console.log("Cloudinary name:", process.env.CLOUDINARY_CLOUD_NAME);
// // console.log("Cloudinary key:", process.env.CLOUDINARY_API_KEY);


// const PORT = process.env.PORT || 5000;
// const app  = express();
// app.use(express.json())
// app.use(cors());


// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log('mongodb connected...'))
//     .catch((err) => console.log(err))

// app.get('/' , (req , res) =>{
//     res.send('hello')
// })

// //Giving a
// app.use('/article' , articleRoutes)
// app.use("/newsletter", newsletterRoutes);


// app.listen(PORT , ()=>{
//     console.log('server is running on port');
    
// })


const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const articleRoutes = require('./routes/articleRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes.js');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected...'))
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // exit if DB fails
    });

// Test route
app.get('/', (req, res) => {
    res.send('Hello from server');
});

// Routes
app.use('/article', articleRoutes);
app.use('/newsletter', newsletterRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
