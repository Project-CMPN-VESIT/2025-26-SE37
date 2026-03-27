const express = require("express");
const router = express.Router();
const {
  addRescueRequest,
  getRescueRequests,
  updateRescueStatus,
  deleteRescueRequest,
} = require("../controllers/rescueRequestController");
const { protect, restrictTo } = require("../middleware/authMiddleware");

router.post("/add", addRescueRequest);
router.get("/all", protect, getRescueRequests);
router.patch("/update/:id", protect, updateRescueStatus);
router.delete(
  "/delete/:id",
  protect,
  restrictTo("superadmin"),
  deleteRescueRequest,
);

module.exports = router;
