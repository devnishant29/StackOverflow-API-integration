const express=require("express")
const router = express.Router()

const {HistoryController,getAllHistory,getHistoryById}=require("../controller/historyController");

router.route("/askQuestion").post(HistoryController);
router.route("/getAllQuestion").get(getHistoryById);
// router.route("/getAllHistory").get(getAllHistory);

module.exports=router;
