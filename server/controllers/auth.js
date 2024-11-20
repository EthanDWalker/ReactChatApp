require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signIn = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.json({ msg: "Enter username and password" });

  try {
    const user = await User.findOne({ name: username });
    if (!user) return res.json({ msg: "User or password invalid" });
    const { _id, password: passwordHash } = user;
    const passwordMatch = await bcrypt.compare(password, passwordHash);
    if (!passwordMatch) return res.json({ msg: "User or password invalid" });
    const token = jwt.sign({ _id, username }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.json({ token: token });
  } catch (error) {
    res.json({ msg: "Unable to sign in" });
    console.log(error);
  }
};

const signUp = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.json({ msg: "Enter username and password" });
  if (username.includes(" ")) return res.json({ msg: "User invalid" });
  try {
    const existingUser = await User.findOne({ name: username });
    if (existingUser) return res.json({ msg: "Username taken" });
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    await User.create({ name: username, password: hash });
    res.json({ success: true });
  } catch (error) {
    res.json({ msg: "Sign Up failed" });
    console.log(error);
  }
};

module.exports = { signUp, signIn };
