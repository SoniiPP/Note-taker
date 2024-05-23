const router = require("express").Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

router.get("/api/notes", async (req, res) => {
  const dbJson = await JSON.parse(
    fs.readFile("db/db.json", JSON.stringify(dbJson))
  );
});

router.post("/api/notes", (req, res) => {
  const dbJson = JSON.parse(fs.readFile("db/db.json", "utf8"));
  const newNotes = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4(),
  };
  dbJson.push(newNotes);
  fs.writeFile("db/db.Json", JSON.stringify(dbJson));
  res.json(dbJson);
});

router.delete("/api/notes/:id", (req, res) => {
  let data = fs.readfile("db/db.json", "utf8");
  const dataJson = JSON.parse(data);
  const newNotes = dataJson.filter((note) => {
    return note.id !== req.params.id;
  });
  fs.writeFile("db/db.json", JSON.stringify(newNotes));
  res.json("Note deleted");
});

module.exports = router;
