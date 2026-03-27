const express = require("express");
const router = express.Router();
const { upload } = require("../config/cloudinary");
const {
  addEvent,
  getEvents,
  deleteEvent,
} = require("../controllers/eventController");
const { protect, restrictTo } = require("../middleware/authMiddleware");

router.get("/all", getEvents);
router.post("/add", protect, upload.single("image"), addEvent);
router.delete("/delete/:id", protect, restrictTo("superadmin"), deleteEvent);

module.exports = router;
