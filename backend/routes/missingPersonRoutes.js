const express = require("express");
const router = express.Router();
const { upload } = require("../config/cloudinary");
const {
  addMissingPerson,
  getMissingPersons,
  deleteMissingPerson,
} = require("../controllers/missingPersonController");
const { protect, restrictTo } = require("../middleware/authMiddleware");

router.get("/all", getMissingPersons);
router.post("/add", protect, upload.single("image"), addMissingPerson);

router.delete("/delete/:id", protect, deleteMissingPerson);

module.exports = router;
