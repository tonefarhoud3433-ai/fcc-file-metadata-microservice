require("dotenv").config();
var express = require("express");
var cors = require("cors");
var multer = require("multer");
var app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(process.cwd() + "/public"));

const upload = multer({ storage: multer.memoryStorage() });

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  try {
    if (!req.file) {
      return res.json({ error: "Please upload a file" });
    }

    res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
    });
  } catch (error) {
    res.status(500).json({
      error: "Server error",
    });
  }
});
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
