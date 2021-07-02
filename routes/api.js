const router = require("express").Router();
const path = require("path");
const { Workout } = require("../models");

// get for same route fetch on api.js
router.get("/api/workouts", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration"
                }
            }
        }
    ])
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        })
})


// put for same route fetch on api.js
router.put("/api/workouts/:id", ({body, params }, res) => {
    Workout.findByIdAndUpdate(
        params.id,
        {
            $push: { exercises: body }
        },
        {
            new: true,
            runValidator: true
        },
    )
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        })
})

// post for the create method in api.js
router.post("/api/workouts", (req, res) => {
    Workout.create(req.body)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        })
})


// get with sort and limit to only recieve last 7 per readme instructions
router.get("/api/workouts/range", (req, res) => {
    Workout.aggregate([
        {
            $addfield: {
                totalDuration: {
                    $sum: "$exercise.duration"
                }
            }
        }
    ])
        .sort({
            id: -1
        })
        .limit(7)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        })
})


module.exports = router;