const { InferenceClient } = require("@huggingface/inference");

if (!process.env.HF_TOKEN) {
  throw new Error("HF_TOKEN is missing");
}

const client = new InferenceClient(process.env.HF_TOKEN);
console.log("HF_TOKEN prefix:", process.env.HF_TOKEN?.slice(0, 3));

module.exports = client;
