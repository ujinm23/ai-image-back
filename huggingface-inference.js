const { InferenceClient } = require("@huggingface/inference");

if (!process.env.HF_TOKEN) {
  throw new Error("HF_TOKEN is missing");
}

const client = new InferenceClient(process.env.HF_TOKEN);

module.exports = client;
