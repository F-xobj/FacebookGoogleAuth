const JWT = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../../configuration/index");
signToken = (user) => {
  return JWT.sign(
    {
      iss: "FXOBJ",
      sub: user._id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1),
    },
    JWT_SECRET
  );
};
module.exports = {
  signUp: async (req, res, next) => {
    //Email & Password
    const { email, password } = req.value.body;
    console.log("email", email);

    //check if there is same user
    const foundUser = await User.findOne({ "local.email": email });
    console.log("foundUser", foundUser);

    if (foundUser) {
      return res.status(403).json({ error: "Email is already in use " });
    }
    //create new user
    console.log("Email : => ", email);

    const newUser = new User({
      method: "local",
      local: {
        email: email,
        password: password,
      },
    });
    await newUser.save();

    //Response with token
    const token = signToken(newUser);
    res.status(200).json({
      token,
    });
  },

  signIn: async (req, res, next) => {
    // Generate Token
    const token = signToken(req.user);
    res.status(200).json({
      token,
    });
  },
  googleOAuth: async (req, res, next) => {
    // Generate Token
    const token = signToken(req.user);
    res.status(200).json({
      token,
    });
    res.status(200).json({ token });
  },

  facebookOAuth: async (req, res, next) => {
    // Generate Token
    console.log("req.value", req.user);
    const token = signToken(req.user);
    res.status(200).json({
      token,
    });
    res.status(200).json({ token });
  },

  secret: async (req, res, next) => {
    console.log("Called Secret    at      :", new Date().getTime());
    res.json({ secret: "resource" });
  },
};
