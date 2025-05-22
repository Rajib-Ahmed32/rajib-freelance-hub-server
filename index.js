const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion } = require("mongodb");

dotenv.config({ path: ".env.local" });

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const taskRoutes = require("./routes/taskRoutes");
app.use("/api/tasks", taskRoutes);

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const db = client.db("freelanceMarketplace");
    const taskCollection = db.collection("tasks");

    app.locals.taskCollection = taskCollection;

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("MongoDB connection failed", err);
  }
}
run();
