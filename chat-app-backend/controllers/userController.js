const asyncHandler = require("express-async-handler");
const {
  User,
  validateregister,
  validatelogin,
} = require("../models/userModel");
const generateToken = require("../config/generateToken");

//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { fullName: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword);
  res.send(users);
});

//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { error } = validateregister(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const { fullName, email, password, avatarUrl } = req.body;

    if (!fullName || !email || !password) {
      res.status(400).send({ message: "Please Enter all the Feilds" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).send({ message: "User already exists" });
    }

    const user = await User.create({
      fullName,
      email,
      password,
      avatarUrl,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        isAdmin: user.isAdmin,
        avatarUrl: user.avatarUrl,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).send({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
  }
});

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
        fullName: user.fullName,
        avatarUrl: user.avatarUrl,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).send({ message: "Invalid Email or Password" });
    }
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
  }
});

module.exports = { allUsers, registerUser, authUser };
