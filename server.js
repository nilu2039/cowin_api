import express from "express";
import cors from "cors";
import fs from "fs";
const app = express();

app.use(cors());
app.use(express.json());

const test = async () => {
  fs.readFile("output.txt", "utf-8", (err, data) => {
    console.log(err);
    console.log(JSON.parse(data));
  });
};
//test();

app.get("/", async (req, res) => {
  try {
    fs.readFile("output.txt", "utf-8", (err, data) => {
      console.log(err);
      console.log(JSON.parse(data));
      res.send(JSON.parse(data));
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(5000, () => {
  console.log("server started at port 5000");
});
