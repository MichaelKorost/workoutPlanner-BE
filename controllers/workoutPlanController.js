const asyncHandler = require("express-async-handler");

const WorkoutPlan = require("../models/workoutPlanModel");

// TODO: copy/fork workout plan
// TODO: add a user to the workout schema for the user validation when updating

// @desc    Get workoutPlans
// @route   GET /api/workouts/
// @access  Public

const getWorkoutPlans = asyncHandler(async (req, res) => {
  const workoutPlans = await WorkoutPlan.find({});

  res.status(200).json(workoutPlans);
});

// @desc    Get workoutPlans
// @route   GET /api/workouts/
// @access  Private

const getUserWorkoutPlans = asyncHandler(async (req, res) => {
  const userWorkoutPlans = await WorkoutPlan.find({ user: req.user._id });
  if (userWorkoutPlans.length === 0) {
    throw new Error("no workout plans were found for this user");
  }
  res.status(200).json(userWorkoutPlans);
});

// @desc    create workoutPlans
// @route   POST /api/workouts/create
// @access  Public

const createWorkoutPlan = asyncHandler(async (req, res) => {
  const { title, plan } = req.body;
  if (!title || !plan) {
    res.status(400);
    throw new Error("please fill all fields");
  }

  const newWorkout = await WorkoutPlan.create({
    user: req.user._id,
    title: title,
    plan: plan,
  });

  res.status(200).json(newWorkout);
});

// @desc    update workoutPlan
// @route   PUT /api/workouts/:id
// @access  Private

const updateWorkoutPlan = asyncHandler(async (req, res) => {
  const workoutPlan = await WorkoutPlan.findById(req.params.id);

  if (!workoutPlan) {
    res.status(400);
    throw new Error("workoutPlan not found");
  }

  // TODO: implement user validation

  // check for user
  // if (!req.user) {
  //     res.status(400)
  //     throw new Error("User not found")
  // }

  // TODO: make sure the logged in user matches the workoutplan
  // if (workoutPlan.user) {
  //     res.status(401)
  //     throw new Error("User not authorized")
  // }

  const updatedWorkoutPlan = await WorkoutPlan.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedWorkoutPlan);
});

// @desc    delete workoutPlan
// @route   PUT /api/workouts/:id
// @access  Private

const deleteWorkoutPlan = asyncHandler(async (req, res) => {
  const workoutPlan = await WorkoutPlan.findById(req.params.id);

  if (!workoutPlan) {
    res.status(400);
    throw new Error("workout plan not found");
  }

  // TODO: implement user validation

  // check for user
  // if (!req.user) {
  //     res.status(400)
  //     throw new Error("User not found")
  // }

  // TODO: make sure the logged in user matches the workoutplan
  // if (workoutPlan.user) {
  //     res.status(401)
  //     throw new Error("User not authorized")
  // }

  await workoutPlan.remove();

  res.status(200).json({ id: req.params.id, message: "workout deleted" });
});

module.exports = {
  createWorkoutPlan,
  getWorkoutPlans,
  updateWorkoutPlan,
  deleteWorkoutPlan,
  getUserWorkoutPlans,
};

/*
example of how to create workout
{
  "title": "chest and stretches",
  "plan": [
    {
      "muscleGroup": "chest",
      "exercises": [
        {
          "exercise": {
            "name": "Barbell Bench Press",
            "group": "chest",
            "tags": ["weights", "barbell"],
            "difficulty": "Intermediate",
            "guide": [
              "Lay flat on the bench with your feet on the ground. With straight arms unrack the bar.",
              "Lower the bar to your mid chest",
              "Raise the bar until you've locked your elbows."
            ],
            "demo": [
              "https://res.cloudinary.com/dlvvmlrui/image/upload/v1674265312/cld-sample-5.jpg",
              "https://res.cloudinary.com/dlvvmlrui/image/upload/v1674265311/cld-sample-4.jpg"
            ]
          },
          "sets": 3,
          "reps": 10,
          "weight": 80
        },
        {
          "exercise": {
            "name": "Decline Push Up",
            "group": "chest",
            "tags": ["bodyweight"],
            "difficulty": "Beginner",
            "guide": [
              "Use a bench to elevate your feet.\n",
              "Put your hands slightly wider than shoulder-width.\n",
              "Slowly lower your body until your chest almost touches the ground\n",
              "Raise your body until you almost lock your elbows.\n"
            ],
            "demo": [
              "https://res.cloudinary.com/dlvvmlrui/image/upload/v1674265312/cld-sample-5.jpg",
              "https://res.cloudinary.com/dlvvmlrui/image/upload/v1674265311/cld-sample-4.jpg"
            ]
          },
          "sets": 4,
          "reps": 30,
          "weight": 20
        }
      ]
    },
    {
      "muscleGroup": "stretches",
      "exercises": [
        {
          "exercise": {
            "name": "Chest Stretch Variation Two",
            "group": "chest",
            "tags": ["stretches"],
            "difficulty": "Beginner",
            "guide": [
              "Lay on your side with one hand just in front of you.\n",
              "With a slight bend in your arm, rotate your arm around your body as slowly as possible.\n",
              "Return to the starting position and then repeat on the other side.\n"
            ],
            "demo": [
              "https://res.cloudinary.com/dlvvmlrui/image/upload/v1674265312/cld-sample-5.jpg",
              "https://res.cloudinary.com/dlvvmlrui/image/upload/v1674265311/cld-sample-4.jpg"
            ]
          },
          "sets": 4,
          "reps": 220,
          "weight": 0
        },
        {
          "exercise": {
            "name": "Chest Stretch Variation Four",
            "group": "chest",
            "tags": ["stretches"],
            "difficulty": "Beginner",
            "guide": [
              "Raise your arms to shoulder height, fully extended in front of you.\n",
              "Slowly bring your arms behind your back still at shoulder height.\n",
              "Pause for a few seconds and then return to starting position.\n"
            ],
            "demo": [
              "https://res.cloudinary.com/dlvvmlrui/image/upload/v1674265312/cld-sample-5.jpg",
              "https://res.cloudinary.com/dlvvmlrui/image/upload/v1674265311/cld-sample-4.jpg"
            ]
          },
          "sets": 12,
          "reps": 10,
          "weight": 0
        },
        {
          "exercise": {
            "name": "Traps Stretch Variation One",
            "group": "traps",
            "tags": ["stretches"],
            "difficulty": "Beginner",
            "guide": [
              "Stand upright with your feet shoulder width apart.\n",
              "Place your left hand on your head and gently pull your head down towards your left shoulder. Then return to centre point.\n",
              "Repeat, using your right hand pulling towards your right shoulder.\n"
            ],
            "demo": [
              "https://res.cloudinary.com/dlvvmlrui/image/upload/v1674265312/cld-sample-5.jpg",
              "https://res.cloudinary.com/dlvvmlrui/image/upload/v1674265311/cld-sample-4.jpg"
            ]
          },
          "sets": 5,
          "reps": 40,
          "weight": 0
        },
        {
          "exercise": {
            "name": "Traps Stretch Variation Two",
            "group": "traps",
            "tags": ["stretches"],
            "difficulty": "Beginner",
            "guide": [
              "Keeping your chest facing forward, turn your head 90 degrees to the left. Then return to centre point.\n",
              "Stand upright with your feet shoulder width apart.\n",
              "Repeat, turning your head in the other direction.\n"
            ],
            "demo": [
              "https://res.cloudinary.com/dlvvmlrui/image/upload/v1674265312/cld-sample-5.jpg",
              "https://res.cloudinary.com/dlvvmlrui/image/upload/v1674265311/cld-sample-4.jpg"
            ]
          },
          "sets": 1,
          "reps": 30,
          "weight": 0
        }
      ]
    }
  ]
}


*/
