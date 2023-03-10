const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create a schema for the users collection
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      uniqie: [true, "Email already taken"],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    passwordConfirmation: {
      type: String,

      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "Passwords do not match",
      },
    },
    name: String,
    height: String,
    weight: String,
    gender: String,
    age: Number,
    bmi: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
