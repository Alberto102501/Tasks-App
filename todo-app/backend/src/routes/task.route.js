const express = require('express');
const contoller = require('../controller/task.controller');

const router = express.Router();

router.get("/", contoller.getTask);
router.post("/create", contoller.createTask);
router.put("/update/:id", contoller.updateTask);
router.delete("/delete/:id", contoller.deleteTask);

module.exports = router;