const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// GET workouts

async function getWorkouts (req, res)  {

    const  user_id  = req.user._id

        const workout = await Workout.find({user_id}).sort({createdAt : -1})
        res.status(200).json(workout)

        if(!workout){
            return res.status(404).json({error: 'No Workouts'})
        }
  
}

// GET a Single Workout 

async  function getWorkout (req, res)  {
    
    const { id } = req.params

    if(mongoose.Types.ObjectId.isValid(id)){
        
        const workout = await Workout.findById(id)
        if(!workout){
            return res.status(404).json({error: 'No such Workout'})
        }

        res.status(200).json(workout)
    } else {
        return res.status(404).json({error:'Not a Valid ID'})
    }
    
  
}

// POST a Workout

async  function createWorkout (req, res)  {

    const { title, reps, load } = req.body
    const  user_id  = req.user._id
    console.log(user_id, 'user idd')
    
    try{
        
        const workout = await Workout.create({title, reps, load, user_id})
        res.status(200).json(workout)
    } catch (error){
        console.log(error)
        res.status(400).json({error:error.message})
    }

}

// DELETE a workout

async  function deleteWorkout (req, res)  {
    
    const { id } = req.params

    if(mongoose.Types.ObjectId.isValid(id)){
        
        const workout = await Workout.findByIdAndDelete(id)

        if(!workout){
            return res.status(404).json({error: 'No such Workout'})
        }

        res.status(200).json({workout, message : 'Workout Deleted'})
        

    } else {
        return res.status(404).json({error:'Not a Valid ID'})
    }
    
  
}
// PATCH a workout

async  function updateWorkout (req, res)  {
    
    const { id } = req.params

    if(mongoose.Types.ObjectId.isValid(id)){
        
        const workout = await Workout.findByIdAndUpdate(id, { ...req.body })

        if(!workout){
            return res.status(404).json({error: 'No such Workout'})
        }

        res.status(200).json({workout, message : 'Workout Updated'})
        
    } else {
        return res.status(404).json({error:'Not a Valid ID'})
    }
    
  
}

 module.exports = {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
 }