const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");

const app = express();

app.use(logger);
app.use(express.json());

let data = [];

// Serve frontend
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// API
app.get("/notifications", (req, res) => {
    res.json({ notifications: data });
});

app.post("/notifications", (req, res) => {
    data.push(req.body);
    res.status(201).json(req.body);
});

app.listen(3000, () => {
    console.log("Server running on port 3000 🚀");
});