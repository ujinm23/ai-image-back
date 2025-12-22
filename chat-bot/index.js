import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HF_TOKEN);

export async function POST(req) {
  const { message } = await req.json();

  const chatCompletion = await client.chatCompletion({
    model: "deepseek-ai/DeepSeek-V3.2:novita",
    messages: [
      { role: "user", content: message },
    ],
  });

  return Response.json({
    reply: chatCompletion.choices[0].message.content,
  });
}
