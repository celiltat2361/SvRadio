const express = require("express") ;

const router = express.Router();
const channelController = require("../controllers/channelController");

router.get("/", channelController.getAllChannels);
router.get("/:channelId", channelController.getChannelById);
router.get("/schedule/:channelId", channelController.getChannelSchedule);
router.get("/programs/:channelId", channelController.getProgramsByChannel);

module.exports = router;