const mongoose = require("mongoose")

const HistorySchema = new mongoose.Schema({
    question: {
      type: String,
      required: true,
    },
    tempid: {
        type: String,
        required: true,
      },
  });

    const history = mongoose.model("History", HistorySchema);
    module.exports = history;