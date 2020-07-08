const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { string } = require("joi");

const Schema = mongoose.Schema;

//create schema

const userSchema = new Schema({
  method: {
    type: String,
    enum: ["local", "google", "facebook"],
    required: true,
  },
  local: {
    email: {
      type: String,
      lowercase: true,
    },
    password: {
      type: String,
    },
  },
  google: {
    id: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
    name: {
      type: String,
    },
  },
  facebook: {
    id: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
    name: {
      type: String,
    },
  },
});

userSchema.pre("save", async function (next) {
  try {
    if (this.method !== "local") {
      next();
    }
    // `Generate a salt
    const salt = await bcrypt.genSalt(10);
    //Generate Password hash (salt + hash )
    const passwordHashed = await bcrypt.hash(this.local.password, salt);

    // Re-assign hashed password over the original one

    this.local.password = passwordHashed;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.ValidatePassword = async function (confirmedPassword) {
  console.log('confirmedPassword', confirmedPassword);

  try {
    return await bcrypt.compare(confirmedPassword, this.local.password);
  } catch (error) {
    throw new Error(error);
  }
};
// create a model
const User = mongoose.model("user", userSchema);
// export the model

module.exports = User;
