const router = require("express").Router();
const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");
const path = require("path");

// Helper function to read notes from db.json
const readNotes = async () => {
  try {
    const data = await fs.readFile(
      path.join(__dirname, "../db/db.json"),
      "utf8"
    );
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading notes:", error);
    throw error;
  }
};

// Helper function to write notes to db.json
const writeNotes = async (notes) => {
  try {
    await fs.writeFile(
      path.join(__dirname, "../db/db.json"),
      JSON.stringify(notes)
    );
  } catch (error) {
    console.error("Error writing notes:", error);
    throw error;
  }
};

router.get("/notes", async (req, res) => {
  try {
    const notes = await readNotes();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to read notes" });
  }
});

router.post("/notes", async (req, res) => {
  const newNote = { id: uuidv4(), ...req.body };

  try {
    const notes = await readNotes();
    notes.push(newNote);
    await writeNotes(notes);
    res.json(newNote);
  } catch (error) {
    res.status(500).json({ error: "Failed to save note" });
  }
});

router.delete("/notes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const notes = await readNotes();
    const updatedNotes = notes.filter((note) => note.id !== id);
    await writeNotes(updatedNotes);
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete note" });
  }
});

module.exports = router;
