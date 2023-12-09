const express=require("express")
const router = express.Router()

const {HistoryController,getAllHistory,getHistoryById}=require("../controller/historyController");

router.route("/addHistory").post(HistoryController);
router.route("/getHistoryById").get(getHistoryById);
router.route("/getAllHistory").get(getAllHistory);

module.exports=router;
