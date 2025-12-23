const client = require("../huggingface-inference");

const getImageCreator = async (req, res) => {
  try {
    const { input } = req.body;

    console.log("");
    if (!input) {
      return res.status(400).json({ error: "Missing input" });
    }
    console.log(" Input received:", input);
    console.log(" Generating image...");
    const image = await client.textToImage({
      provider: "nebius",
      model: "black-forest-labs/FLUX.1-schnell",
      inputs: input,
      parameters: { num_inference_steps: 5 },
    });
    console.log(" Image generated, converting to Base64");
    const arrayBuffer = await image.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    const dataUrl = `data:image/png;base64,${base64}`;

    res.json({ result: dataUrl });

    // console.log("image", dataUrl);
    console.log("Done!");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Image creation failed" });
  }
};

module.exports = getImageCreator;
