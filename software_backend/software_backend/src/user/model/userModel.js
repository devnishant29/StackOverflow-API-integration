const mongoose = require("mongoose")

const SignUpSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => {
          return /\S+@\S+\.\S+/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  });

    const SignUp = mongoose.model("SignUp", SignUpSchema);
    module.exports = SignUp;