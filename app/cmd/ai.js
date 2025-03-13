const axios = require('axios');

exports.meta = {
  name: "ai",
  aliases: ["mistral", "le chat"],
  prefix: "both",
  version: "1.0.0",
  author: "My API",
  description: "Ask Le chat ai.", // fixed typo from "4o" to "4"
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
    const apiUrl = `${global.api.main}/api/mixtral-8x7b?prompt=${encodeURIComponent(question)}&uid=${chatId}`;
    const response = await axios.get(apiUrl);

    // Use optional chaining to safely access the API response.
    const aiResponse = response.data?.response || "No response was returned from the API.";

    await wataru.reply(aiResponse);
  } catch (error) {
    console.error("Error fetching AI response:", error.response ? error.response.data : error);
    await wataru.reply("An error occurred while fetching the AI response.");
  }
};
