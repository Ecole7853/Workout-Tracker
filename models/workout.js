const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const workoutModel = new Schema({
    day: {
        type:Date,
    },
    exercises: [
        {
            type: {
                type: String,
                required: "Enter an exercise type"
            },
            name: {
                type: String,
                required: "Enter a name for this exercise"
            },
            duration: {
                type: Number,
                required: "Please enter a duration in minutes"
            },
            weight: {
                type: Number,
            },
            reps: {
                type: Number,
            },
            sets: {
                type: Number,
            },
            distance: {
                type: Number,
            }
        }
    ]
})

const Workout = mongoose.model("Workout", workoutModel);

module.exports = Workout;