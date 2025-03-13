const axios = require('axios');

exports.meta = {
  name: "ai",
  aliases: ["bot", "gpt"],
  prefix: "both",
  version: "1.0.0",
  author: "My API",
  description: "Ask with ai.",
  guide: ["<query>"],
  category: "ai"
};

exports.onStart = async function({ wataru, msg, chatId, args }) {
  try {
    const question = args.join(" ");
    if (!question) {
      return await wataru.reply('Please provide a question.');
    }

    // Build the API URL with the user's question.
    const apiUrl = `https://daiki.gleeze.com/api/gpt4o-mini?prompt=${encodeURIComponent(question)}&uid=${chatId}`;
    const response = await axios.get(apiUrl);

    // Use optional chaining to safely access the API response.
    const aiResponse = response.data.response || "No response was returned from the API.";

    await wataru.reply(aiResponse);
  } catch (error) {
    console.error("Error fetching AI response:", error.response ? error.response.data : error);
    await wataru.reply("An error occurred while fetching the AI response.");
  }
};
