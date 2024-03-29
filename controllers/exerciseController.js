const { Exercise } = require("../models/exerciseModel");

const asyncHandler = require("express-async-handler");

// @Desc         Get all exercises
// @Route        GET /api/exercises
// @access       public

const getExercises = asyncHandler(async (req, res) => {
  const exercises = await Exercise.find({});

  res.status(200).json(exercises);
});

// @Desc         Get exercises by group
// @Route        GET /api/exercises/group/:group
// @access       public

const getExercisesByGroup = asyncHandler(async (req, res) => {
  const { group } = req.params;
  if (!group) {
    res.status(400);
    throw new Error('please fill the "group" - path /group/:group');
  }
  const groups = group.split(",");
  const exercises = await Exercise.find({
    group: { $in: groups.map((group) => RegExp(group, "i")) },
  });
  res.status(200).json(exercises);
});

// @Desc         Get exercises by tags
// @Route        GET /api/exercises/tags/:tag1,tag2
// @access       public

const getExercisesByTags = asyncHandler(async (req, res) => {
  const { tag } = req.params;
  if (!tag) {
    res.status(400);
    throw new Error('please fill in a "tag" field');
  }
  const tags = tag.split(",");
  const exercises = await Exercise.find({
    tags: { $in: tags.map((tag) => RegExp(tag, "i")) },
  }); //to get documents with specific tag replace $in with $all
  res.status(200).json(exercises);
});

// @Desc         Get exercises by difficulty
// @Route        GET /api/exercises/difficulty/:difficulty
// @access       public

const getExercisesByDifficuly = asyncHandler(async (req, res) => {
  const { difficulty } = req.params;
  if (!difficulty) {
    res.status(400);
    throw new Error(
      'please fill the "difficulty" - path /difficulty/:difficulty'
    );
  }
  const exercises = await Exercise.find({
    difficulty: { $regex: difficulty, $options: "i" },
  });
  res.status(200).json(exercises);
});

// @Desc         Get exercises by difficulty
// @Route        GET /api/exercises/name/:name  replace space === %20
// @access       public

const getExercisesByName = asyncHandler(async (req, res) => {
  const { name } = req.params;
  if (!name) {
    res.status(400);
    throw new Error('please fill the "name" - path /name/:name');
  }

  const exercises = await Exercise.find({
    name: { $regex: name, $options: "i" },
  });
  res.status(200).json(exercises);
});

// @Desc         Get exercise by id
// @Route        GET /api/exercises/id/:id
// @access       public

const getExerciseById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const exercise = await Exercise.findById(id);

  if (!exercise) {
    res.status(404);
    throw new Error("Exercise not found");
  }

  res.status(200).json(exercise);
});

// @Desc         Get exercises by conpound search
// @Route        GET /api/exercises/search?group=traps&tags=weights,barbell&difficulty=Advanced
// @access       public

const getExercisesBySearch = asyncHandler(async (req, res) => {
  const { group, tags, difficulty, name } = req.query;
  // create an empty query object
  let query = {};

  if (group) {
    const groups = group.split(",");
    query["group"] = { $in: groups.map((group) => RegExp(group, "i")) };
  }

  if (tags) {
    // split the tags query into an array
    const tagsArr = tags.split(",");
    query["tags"] = { $in: tagsArr.map((tag) => RegExp(tag, "i")) };
  }

  if (difficulty) {
    const difficulties = difficulty.split(",");
    query["difficulty"] = {
      $in: difficulties.map((difficulty) => RegExp(difficulty, "i")),
    };
  }

  if (name) {
    query["name"] = { $regex: name, $options: "i" };
  }
  // using the built query object to find matching exercises
  const exercises = await Exercise.find(query);
  res.status(200).json(exercises);
});

module.exports = {
  getExercises,
  getExercisesByGroup,
  getExercisesByTags,
  getExercisesByDifficuly,
  getExercisesByName,
  getExercisesBySearch,
  getExerciseById,
};
