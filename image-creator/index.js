const client = require("../huggingface-inference");

const getImageCreator = async (req, res) => {
  try {
    const { input } = req.body;
    // console.log("req", req.body);
    console.log("");
    if (!input) {
      return res.status(400).json({ error: "Missing input" });
    }
    console.log("input", input);
    const image = await client.textToImage({
      provider: "nebius",
      model: "black-forest-labs/FLUX.1-schnell",
      inputs: input,
      parameters: { num_inference_steps: 5 },
    });
    const arrayBuffer = await image.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    // Create data URL
    const dataUrl = `data:image/png;base64,${base64}`;

    // Send URL to front-end
    res.json({ result: dataUrl });
    console.log("image", dataUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Image creation failed" });
  }
};

module.exports = getImageCreator;
