const client = require("../huggingface-inference");

const getImageEditor = async (req, res) => {
  try {
    console.log("Received image edit request");

    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt" });
    }

    console.log("Prompt:", prompt);
    console.log("Image received, preparing image blob...");

    const imageBlob = new Blob([req.file.buffer], {
      type: req.file.mimetype,
    });

    console.log("Sending image to AI for editing...");

    const image = await client.imageToImage({
      provider: "wavespeed",
      model: "Qwen/Qwen-Image-Edit-2509",
      inputs: imageBlob,
      parameters: {
        prompt,
      },
    });

    const arrayBuffer = await image.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const dataUrl = `data:image/png;base64,${base64}`;

    console.log("Image editing finished ");

    res.json({ result: dataUrl });
  } catch (err) {
    console.error("Image editing failed:", err);

    const message =
      err?.httpResponse?.status === 402
        ? "Image editing limit reached. Please try again later."
        : "Image editing failed.";

    res.status(err?.httpResponse?.status || 500).json({ error: message });
  }
};

module.exports = getImageEditor;
