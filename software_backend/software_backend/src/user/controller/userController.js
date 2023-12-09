const express = require("express");
const SignUp = require("./../model/userModel");

const SignUpController = async (req, res) => {
  console.log(req.body);
  if (req.body == null) {
    return res.status(401).send({
      status: 0,
      failure: "No data provided!",
    });
  }

  try {
    const signUpDetails = new SignUp({
      ...req.body,
    });
    await signUpDetails.save();
    res.status(200).send({
      status: 1,
      message: "data added successfully",
      data: signUpDetails,
    });
  } catch (e) {
    console.log(e);

    return res.status(500).send({
      status: 0,
      error: `${e}`,
    });
  }
};

const LoginController = async (req, res) => {
    
    console.log(req.body);
    if (req.body == null) {
      return res.status(401).send({
        status: 0,
        failure: "No data provided!",
      });
    }
    const { email, password } = req.body;
  
    try {
      const user = await SignUp.findOne({ email });
      if (!user) {
        return res.status(401).send({
          status: 0,
          failure: "User not found",
        });
      }
      if (password !== user.password) {
        return res.status(401).send({
          status: 0,
          failure: "Invalid password",
        });
      }

      res.status(200).send({
        status: 1,
        message: "Login successful",
        data: user,
      });
    } catch (e) {
      console.log(e);
  
      return res.status(500).send({
        status: 0,
        error: `${e}`,
      });
    }
  };

const getUser = async (req, res) => {
  const data = await SignUp.find({});
  res.send(data);
};

module.exports = { SignUpController, getUser,LoginController };
