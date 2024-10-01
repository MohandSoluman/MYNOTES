const notes = require("../model/note.model");

const getNoteById = (req, res) => {
  const id = req.params.id;

  const note = notes.find((note) => note.id === parseInt(id));
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }
  res.json(note);
};

const getAllNotes = (req, res) => {
  res.json(notes);
};

const createNote = (req, res) => {
  const newNote = {
    id: notes.length + 1,
    title: req.body.title,
    content: req.body.content,
  };
  notes.push(newNote);
  res.status(201).json(newNote);
};

const updateNote = (req, res) => {
  const id = parseInt(req.params.id);
  const note = notes.find((note) => note.id === id);
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }
  note.title = req.body.title;
  note.content = req.body.content;
  res.json(note);
};

const deleteNote = (req, res) => {
  const id = parseInt(req.params.id);
  const noteIndex = notes.findIndex((note) => note.id === id);
  if (noteIndex === -1) {
    return res.status(404).json({ message: "Note not found" });
  }
  notes.splice(noteIndex, 1);
  res.json({ message: "Note deleted successfully" });
};

module.exports = {
  getNoteById,
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
};
