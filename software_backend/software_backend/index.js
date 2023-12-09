const express = require("express");
const connectDB = require("./src/db/connectDb");
const bodyParser = require("body-parser");
const app = express();
const userRoute = require("./src/user/routes/userRoute");
const history_Route = require("./src/history/routes/historyRoute");
const PORT = process.env.PORT || 5000;
const uri ="mongodb+srv://nihalvish29:WxYgE4vSPTcOaLIN@cluster0.b6nhgoe.mongodb.net/";
const cors=require("cors");
app.use(cors());
app.use(bodyParser.json());
app.use("/api", userRoute);
app.use("/api/history",history_Route);

const start = async () => {
  try {
    await connectDB(uri);
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`${PORT} Connected`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
