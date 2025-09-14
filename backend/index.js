const express = require("express");
const path = require("path");
const taskRoutes = require("./routes/tasks");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

// Serve images from src folder
app.use("/src", express.static(path.join(__dirname, "../src")));

// API routes
app.use("/api/tasks", taskRoutes);

// Fallback for SPA or direct HTML access
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
