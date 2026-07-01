require("dotenv").config();
var express = require("express");
var cors = require("cors");
var multer = require("multer");
var app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(__dirname + "/public"));

const upload = multer({ storage: multer.memoryStorage() });
app.use("/public", express.static(__dirname + "/public"));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  try {
    if (!req.file) {
      return res.json({ error: "Please upload a file" });
    }

    const fileName = req.file.originalname || "file.txt";

    const fileType = req.file.mimetype || "application/octet-stream";

    const fileSize = Number(req.file.size);

    res.json({
      name: fileName,
      type: fileType,
      size: fileSize,
    });
  } catch (error) {
    res.status(400).json({ error: "File upload failed" });
  }
});
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
