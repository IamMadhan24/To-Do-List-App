const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM tasks ORDER BY id ASC");
  res.json(result.rows);
});

router.post("/", async (req, res) => {
  const { text } = req.body;
  const result = await pool.query(
    "INSERT INTO tasks (text) VALUES ($1) RETURNING *",
    [text]
  );
  res.json(result.rows[0]);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { checked } = req.body;
  await pool.query("UPDATE tasks SET checked = $1 WHERE id = $2", [checked, id]);
  res.sendStatus(200);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
  res.sendStatus(200);
});

module.exports = router;
