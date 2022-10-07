const bcrypt = require("bcrypt");
const key = require("../config").key;
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const register = async (req, res) => {
  const { username, fullname, password, email } = req.body;
  // If the user did not pass the required information, status code 400 is launched
  if (!username || !fullname || !password || !email) {
    return res.status(400).json({
      state: "Error",
      error: "Bad Request - Missing data",
    });
  }
  try {
    const errors = [];
    const userUsernameExist = await User.findOne({
      where: { username: username },
    });
    const userEmailExist = await User.findOne({
      where: { email: email },
    });
    if (userUsernameExist) {
      errors.push("Username already exists");
    }
    if (userEmailExist) {
      errors.push("Email already exists");
    }
    if (errors.length > 0) {
      return res.status(400).json({
        state: "Error",
        error: errors,
      });
    }
    let passEncrypt = await bcrypt.hash(password, 8);
    const newUser = User.create({
      username: username,
      full_name: fullname,
      email: email,
      password: passEncrypt,
    });
    const token = jwt.sign(
      {
        username: username,
        userId: newUser.id,
      },
      key,
      {
        expiresIn: "7d",
      }
    );
    res
      .status(200)
      .json({
        state: "Registered",
        username: username,
      })
      .cookie({
        token: token,
        maxAge: 604800000,
        httpOnly: true,
      });
  } catch (error) {
    res.status(400).json({
      state: "Error",
      error: error,
    });
  }
};

const login = async (req, res) => {
  const { user, password } = req.body;
  if (!user || !password) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - Missing data",
    });
  }
  try {
    let datoSearch = user.includes("@") ? { email: user } : { username: user };
    const userExists = await User.findOne({
      where: datoSearch,
    });
    if (!userExists) {
      return res.status(404).json({
        status: "Error",
        error: "Bad request - failed credentials",
      });
    }
    const passMatch = bcrypt.compare(password, userExists.password);
    if (!passMatch) {
      return res.status(404).json({
        status: "Error",
        error: "Bad request - failed credentials",
      });
    }
    const token = jwt.sign(
      {
        username: userExists.username,
        userId: userExists.id,
      },
      key,
      {
        expiresIn: "7d",
      }
    );
    return res
      .status(200)
      .cookie("token", token, { maxAge: 604800000, httpOnly: true })
      .json({ status: "logged", username: userExists.username, token: token });
  } catch (error) {
    return res.status(400).json({
      status: "Error",
      error: error,
    });
  }
};

const logout = (req, res) => {
  res.clearCookie("token").json({ status: "logged out" });
};

const verifyTokenUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.status(200).json({
        status: "token not found",
      });
    const verified = jwt.verify(token, key);
    const tokenInfo = jwt.decode(token);
    const username = tokenInfo.username;
    res.status(200).json({
      status: "authorized",
      username: username,
    });
  } catch (error) {
    res.status(200).json({
      status: "no authorized",
    });
  }
};

module.exports = {
  login: login,
  register: register,
  verifyTokenUser: verifyTokenUser,
  logout: logout,
};
