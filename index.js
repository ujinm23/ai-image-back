const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");

const getImageAnalysis = require("./image-analysis");
const getIngredientRecognition = require("./image-editor");
const getImageCreator = require("./image-creator");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 168;

const upload = multer({
  storage: multer.memoryStorage(),
});

app.use(cors());
app.use(express.json());

app.post("/analyze-image", upload.single("image"), getImageAnalysis);
app.post("/ingredient-recognition", getIngredientRecognition);
app.post("/image-create", getImageCreator);

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
