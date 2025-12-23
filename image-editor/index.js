const client = require("../huggingface-inference");

const getImageEditor = async (req, res) => {
  try {
    console.log(" Received image edit request");

    const input = req.body.prompt;
    if (!req.file) {
      console.log(" No image uploaded");
      return res.status(400).json({ error: "No image uploaded" });
    }
    console.log("Prompt:", input);
    const base64Image = req.file.buffer.toString("base64");
    console.log(" Sending image to AI for editing...");

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
    console.log("AI edited image, converting to Base64");

    const arrayBuffer = await image.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const dataUrl = `data:image/png;base64,${base64}`;

    console.log(" Sending edited image back to frontend");

    res.json({ result: dataUrl });
  } catch (err) {
    console.error("Image editing failed:", err);
    res.status(500).json({ error: "Image analysis failed", err });
  }
};

module.exports = getImageEditor;
