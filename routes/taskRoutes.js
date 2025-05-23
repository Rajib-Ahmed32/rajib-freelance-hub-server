const express = require("express");
const { ObjectId } = require("mongodb");

module.exports = (taskCollection) => {
  const router = express.Router();

  // Create a new task
  router.post("/", async (req, res) => {
    try {
      const newTask = req.body;
      if (newTask.deadline) {
        newTask.deadline = new Date(newTask.deadline);
      }
      const result = await taskCollection.insertOne(newTask);
      res
        .status(201)
        .json({ message: "Task added", taskId: result.insertedId });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Get tasks, optionally filter for featured (sorted by deadline)
  router.get("/", async (req, res) => {
    try {
      const isFeatured = req.query.featured === "true";
      let tasks;

      if (isFeatured) {
        tasks = await taskCollection
          .find({ deadline: { $exists: true, $ne: null } })
          .sort({ deadline: 1 })
          .limit(6)
          .toArray();
      } else {
        tasks = await taskCollection.find().toArray();
      }

      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  });

  // Get task by ID
  router.get("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const task = await taskCollection.findOne({ _id: new ObjectId(id) });

      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      res.json(task);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Delete task by ID
  router.delete("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const result = await taskCollection.deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "Task not found" });
      }

      res.json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Update task by ID
  router.put("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const updatedTask = req.body;

      const result = await taskCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedTask }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ error: "Task not found" });
      }

      res.json({ message: "Task updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  return router;
};
