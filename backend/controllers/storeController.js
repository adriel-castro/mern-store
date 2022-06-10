const asyncHandler = require("express-async-handler");
const Store = require("../models/storeModels");
const User = require("../models/userModel");
// @desc Get Stores
// @route GET /api/stores
// @access Private
const getStores = asyncHandler(async (req, res) => {
  const store = await Store.find({ user: req.user.id });

  res.status(200).json(store);
});

// @desc Set Store
// @route SET /api/stores
// @access Private
const setStore = asyncHandler(async (req, res) => {
  const store = await Store.create({
    text: req.body.text,
    user: req.user.id,
  });

  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  res.status(200).json(store);
});

// @desc Update Store
// @route PUT /api/stores/:id
// @access Private
const updateStore = asyncHandler(async (req, res) => {
  const store = await Store.findById(req.params.id);

  if (!store) {
    res.status(400);
    throw new Error("Store Not Found");
  }

  const user = await User.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }

  // Make sure the logged in user matches the store user
  if (store.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User is not Authorized!");
  }

  const updatedStore = await Store.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedStore);
});

// @desc Delete Store
// @route DELETE /api/stores/:id
// @access Private
const deleteStore = asyncHandler(async (req, res) => {
  const store = await Store.findById(req.params.id);

  if (!store) {
    res.status(400);
    throw new Error("Store Not Found");
  }

  const user = await User.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }

  // Make sure the logged in user matches the store user
  if (store.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not Authorized!");
  }

  await store.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getStores,
  setStore,
  updateStore,
  deleteStore,
};
