const client = require("../huggingface-inference");

const getImageEditor = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }
    const base64Image = req.file.buffer.toString("base64");

    const image = await client.imageToImage({
      provider: "wavespeed",
      model: "Qwen/Qwen-Image-Edit-2509",
      inputs: {
        type: "image_url",
        image_url: {
          url: `data:${req.file.mimetype};base64,${base64Image}`,
        },
      },
      parameters: { prompt: input },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Image analysis failed", err });
  }
};

module.exports = getImageEditor;
