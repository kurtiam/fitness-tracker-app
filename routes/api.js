const router = require("express").Router();
const Workout = require("../models/workout.js");
console.log("api routes", Workout)

router.post("/api/workouts", (req, res) => {
  console.log("post")
  Workout.create({})
    .then(data => {
      console.log("posted", data)
      res.json(data);
    })
    .catch(err => {
      console.log("error", err)
      res.json(err);
    });
});

router.put("/api/workouts/:id", ({ body, params }, res) => {
  Workout.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body } },
    { new: true, runValidators: true }
  )
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/api/workouts", (req, res) => {
  Workout.find()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);

    });
});

router.get("/api/workouts/range", (req, res) => {
  Workout.find({})
    .limit(7)
    .then(data => {
      console.log(data);
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

router.delete("/api/workouts", ({ body }, res) => {
  Workout.findByIdAndDelete(body.id)
    .then(() => {
      res.json(true);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
