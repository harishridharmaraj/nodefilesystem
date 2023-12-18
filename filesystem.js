const express = require("express");
const fs = require("fs");
const path = require("path");

const App = express();

App.get("/", (req, res) => {
  res.send("Hello");
});

App.post("/create_file", (req, res) => {
  const timeStamp = new Date().toISOString();
  const timess = timeStamp.split("T");
  const date = timess[0];
  const timedum = timess[1].split(".");
  const time = timedum[0];
  const folderPath = path.join(__dirname, "files");
  const filePath = path.join(folderPath, `${date} - ${time}.txt`);
  console.log(timeStamp, timess, date, time);
  fs.writeFile(filePath, timeStamp, (err) => {
    if (err) {
      console.log("Error on File creation", err);
    } else {
      res.send("File Created");
      console.log("File Created");
    }
  });
});

App.get("/get_files", (req, res) => {
  const folderPath = path.join(__dirname, "files");
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.log("Error on Fetching Data", err);
    } else {
      res.json({ files });
    }
  });
});

App.listen(3000, () => {
  console.log("Port started on 3000");
});
