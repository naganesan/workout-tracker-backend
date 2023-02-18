const express = require('express')
const WorkoutRoutes = express.Router()
const routerAuth = require('../middlewares/routerAuth')

const  {createWorkout, 
        getWorkout, 
        getWorkouts, 
        deleteWorkout,
        updateWorkout, 
 } = require('../controllers/workoutController') 

 WorkoutRoutes.use(routerAuth) 

// get a workout
WorkoutRoutes.get('/:id', getWorkout)

// get all workouts
WorkoutRoutes.get('/', getWorkouts)

// post a workout
WorkoutRoutes.post('/', createWorkout )

// delete a workout
WorkoutRoutes.delete('/:id', deleteWorkout)

// update a workout
WorkoutRoutes.patch('/:id', updateWorkout)


module.exports = WorkoutRoutes