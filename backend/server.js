require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const propertyRoutes = require('./routes/properties');
const userRoutes = require('./routes/user');

app.use(cors())
// express app
const app = express()

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/properties',propertyRoutes);
app.use('/api/user',userRoutes);

//Connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to DB & listening for requests on port 4000')
        });
    })
    .catch(err => console.log(err))

process.env
