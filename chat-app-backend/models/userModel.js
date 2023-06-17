const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = mongoose.Schema(
  {
    fullName: { type: "String", required: true },
    email: { type: "String", unique: true, required: true },
    password: { type: "String", required: true },
    avatarUrl: {
      type: "String",
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestaps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

const validateregister = (data) => {
  const Schema = joi.object({
    avatarUrl: joi.string().required().label("Profile Pic"),
    fullName: joi.string().required().label("Full Name"),
    email: joi.string().required().email().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });
  return Schema.validate(data);
};

module.exports = { User, validateregister };
