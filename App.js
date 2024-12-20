const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Set up static folder for serving CSS
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  fs.readdir("Hisaabs", (err, data) => {
    console.log(data);
    if (err) return res.status(404).send(err);
    else res.render("index", { files: data });
  });
});
app.get("/Create", (req, res) => {
  console.log("Create get Post method");
  res.render("Create");
});
app.post("/Create", (req, res) => {
  console.log("Create Post method");
  let data = req.body.hisaab;
  console.log(data);
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0"); // Pad single digit days with 0
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() returns month from 0-11, so add 1
  const year = date.getFullYear(); // Get the full year (e.g., 2024)
  const fileName = `${day}-${month}-${year}`;
  console.log(fileName);
  fs.writeFile(`Hisaabs/${req.body.title}.txt`, data, (err) => {
    if (err) return res.status(404).send("error");
    fs.readdir("Hisaabs", (err, data) => {
      if (err) return res.status(404).send("error");
      res.render("index", { files: data });
    });
  });
});

app.get("/Hisaab/:fileName", (req, res) => {
   const file = req.params.fileName;
   fs.readFile(`Hisaabs/${file}`, (err, data) => {
    if (err) return res.status(404).send("error");
    res.render("Hisaab",{file,data});
   });
});
app.get("/Edit/:fileName", (req, res) => {
  console.log("Edit get method");
  res.render("Edit");
});
app.post("/Edit", (req, res) => {
  console.log("Edit Post method");
  res.render("index");
});
app.get("/Delete/:fileName", (req, res) => {
  res.end("Deleted");
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
