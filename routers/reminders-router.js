const express = require('express');
const router = express.Router();
const remindersController = require('../controllers/reminder-controller.js');

router.post("/", remindersController.createReminder);

router.get("/", remindersController.getAllReminders);

router.get("/id/:id", remindersController.getReminderById);

router.get("/:created_by_user_id", remindersController.getRemindersByUserId);

router.delete("/:id", remindersController.deleteReminder);

router.patch("/:id", remindersController.updateReminder);

module.exports = router;
