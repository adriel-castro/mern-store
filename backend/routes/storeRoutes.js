const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  getStores,
  setStore,
  updateStore,
  deleteStore,
} = require("../controllers/storeController");

router.route("/").get(protect, getStores).post(protect, setStore);
router.route("/:id").put(protect, updateStore).delete(protect, deleteStore);

module.exports = router;
