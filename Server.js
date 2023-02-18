require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose')

//Routes
const WorkoutRoutes = require('./routes/workout')
const UserRoutes = require('./routes/userroute')

// Middlewares
app.use(express.json())
app.use((req ,res ,next) => {
    console.log(req.path, '' , req.method)
    next()
})


app.use('/api/workout', WorkoutRoutes)
app.use('/api/user', UserRoutes)

mongoose.set("strictQuery", true);

// Server Listening
mongoose.connect(process.env.MONGO_URI, {dbName:"WorkOutData"})
    .then(

        
        app.listen(process.env.PORT, () => {
            console.log('Database Running & Express running...')
        })

    )
    .catch((err) => {
        console.log('mongoose error :', err)
    })



