var express = require("express");
var cors = require("cors");
require("dotenv").config();

var app = express();
const multer = require("multer");
const storage = multer.memoryStorage();
const upLoad = multer({ storage: storage });

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));
app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upLoad.single("upfile"), (req, res, next) => {
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  });
  next();
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
