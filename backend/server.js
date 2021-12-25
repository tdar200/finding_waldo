const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const app = express();

const { MongoClient } = require("mongodb");

dotenv.config();

const connectDB = async () => {
  const client = new MongoClient(process.env.MONGO_URI);
  try {
    await client.connect();
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  app.route("/api/getting").get(async function (req, res) {
    try {
      await client
        .db("FindingWaldo")
        .collection("data")
        .find({})
        .toArray(function (err, results) {
          res.json(results);
        });
    } catch (error) {
      console.error(error);
    }
  });
  const publicPath = path.join(__dirname, "../frontend/build");
  app.use(express.static(publicPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
  });
};

const port = process.env.PORT || 5000;
app.use(express.json());
connectDB();

app.listen(port, console.log(`Server running in mode on port`));
