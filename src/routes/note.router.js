const express = require("express");
const controller = require("../controllers/note.controller");

const router = express.Router();

router.route("/").get(controller.getAllNotes).post(controller.createNote);
router
  .route("/:id")
  .get(controller.getNoteById)
  .patch(controller.updateNote)
  .delete(controller.deleteNote);

module.exports = router;
