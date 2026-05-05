const express = require('express');
const logger = require('./middleware/logger.js');

const app = express();
app.use(logger);

app.use(express.json());
let data = [];

app.get("/notifications", (req, res) => {
    res.json({data});
});

app.post("/notifications", (req, res) => {
    data.push(req.body);
    res.status(201).json(req.body);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});