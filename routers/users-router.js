const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user-controller');

router.post("/", usersController.createUser);

router.get("/", usersController.getAllUsers);

router.get("/:id", usersController.getUserById);

router.patch("/:id", usersController.updateUser);

router.delete("/:id", usersController.deleteUser);

module.exports = router;
