const express = require('express');
const router = express.Router();
const noteController = require('../controllers/note-controller.js')

router.get("/id/:id", noteController.getNoteById);

router.get("/:created_by_user_id", noteController.getNotesByUserId);

router.post("/", noteController.createNote);

router.delete("/:id", noteController.deleteNote);

router.patch("/:id", noteController.updateNote);

module.exports = router;