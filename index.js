const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion } = require("mongodb");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

const client = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    console.log("MongoDB connected");

    const database = client.db("taskdb");
    const taskCollection = database.collection("task");

    const taskRoutes = require("./routes/taskRoutes")(taskCollection);
    app.use("/api/tasks", taskRoutes);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Connection failed:", err);
  }
}

run();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
