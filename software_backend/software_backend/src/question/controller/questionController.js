const express = require("express");
const history = require("./../model/historyModel");

const askQuestion = async (req, res) => {
  console.log(req.body);
  const { tempid } = req.query;
  if (req.body == null) {
    return res.status(401).send({
      status: 0,
      failure: "No data provided!",
    });
  }

  try {
    const historyDetails = new history({
      ...req.body,
      tempid: tempid,
    });
    await historyDetails.save();
    res.status(200).send({
      status: 1,
      message: "data added successfully",
      data: historyDetails,
    });
  } catch (e) {
    console.log(e);

    return res.status(500).send({
      status: 0,
      error: `${e}`,
    });
  }
};

const getHistoryById = async (req, res) => {
    const userId = req.query.userId;
    
    try {
      const searchHistory = await history.find({ tempid:userId });
  
      res.status(200).json({
        status: 1,
        data: searchHistory,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 0,
        error: "Internal server error",
      });
    }
  };

const getAllHistory = async (req, res) => {
  const data = await history.find({});
  res.send(data);
};

module.exports = {HistoryController,getAllHistory,getHistoryById };
