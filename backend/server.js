const express = require("express");
const router = express.Router();
const moongose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

const { MongoClient } = require("mongodb");

dotenv.config();

// const client =  moongose.connect(process.env.MONGO_URI, {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
//   useCreateIndex: true,

// }, () => console.log("DB CONNECTED"))

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

  app.route("/api/list").get(async function (req, res) {
    try {
      const data = await client.db("FindingWaldo").admin().listDatabases();
      res.json(data);
    } catch (error) {
      console.error(error);
    }
  });
};

connectDB();

app.use(express.json());

async function createData(client, newData) {
  const result = await client
    .db("FindingWaldo")
    .collection("data")
    .insertOne(newData);
  console.log(result);
}

async function getData(client, newData) {
  const result = await client.db("FindingWaldo").collection("data").find();
  console.log(result);
}

async function listDatabases(client) {
  const dbList = await client.db().admin().listDatabases();

  // console.log(dbList);
}

app.listen(5000, console.log(`Server running in mode on port`));
