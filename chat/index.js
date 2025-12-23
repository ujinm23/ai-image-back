const { InferenceClient } = require("@huggingface/inference");
const client = new InferenceClient(process.env.HF_TOKEN);

let conversationHistory = [];

const getChat = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ reply: "No message provided" });

    conversationHistory.push({ role: "user", content: message });
    console.log("Received message:", message);

    const chatCompletion = await client.chatCompletion({
      model: "deepseek-ai/DeepSeek-V3.2:novita",
      messages: conversationHistory,
    });

    const aiReply = chatCompletion.choices[0].message.content;
    console.log("AI reply:", aiReply);

    conversationHistory.push({ role: "assistant", content: aiReply });

    res.status(200).json({ reply: aiReply });
  } catch (err) {
    console.error("Chat API error:", err);
    res.status(500).json({ reply: "Failed to get AI response" });
  }
};

module.exports = getChat;
