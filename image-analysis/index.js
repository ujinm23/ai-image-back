const client = require("../huggingface-inference");

const getImageAnalysis = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }
    console.log(" Image uploaded");
    console.log("Analysing image ");

    const base64Image = req.file.buffer.toString("base64");

    const result = await client.chatCompletion({
      model: "Qwen/Qwen2.5-VL-7B-Instruct",

      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Describe this image in one sentence.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${req.file.mimetype};base64,${base64Image}`,
              },
            },
          ],
        },
      ],
    });
     

    res.json({
      description: result.choices[0].message.content,
    });
    console.log("Done!");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Image analysis failed", err });
  }
};

module.exports = getImageAnalysis;
