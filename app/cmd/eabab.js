const axios = require("axios");

exports.meta = {
  name: "shoti",
  version: "1.0.0",
  description: "Sends a random shoti video",
  category: "fun",
  prefix: "both",
  guide: "Type /shoti to get a random shoti video",
};

exports.onStart = async ({ wataru }) => {
  try {
    // Fetch a random shoti video URL with error handling and timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout (videos might take longer)
    
    const response = await axios.get("https://betadash-shoti-yazky.vercel.app/shotizxx", {
      params: {
        apikey: "shipazu"
      },
      signal: controller.signal,
      timeout: 15000,
    });
    
    clearTimeout(timeoutId);
    
    const videoData = response.data;
    
    if (!videoData || !videoData.shotiurl) {
      throw new Error("No video URL received from API");
    }
    
    // Send the video using wataru.video method
    wataru.video(videoData.shotiurl, {
      caption: "Here's your random chix video! ✨",
      parse_mode: "HTML",
    });
    
  } catch (error) {
    console.error("Error fetching shoti video:", error);
    
    if (error.code === "ECONNABORTED" || error.name === "AbortError") {
      wataru.reply("Sorry, the request timed out. The shoti server might be busy. Please try again later.");
    } else if (error.response) {
      wataru.reply(`Sorry, the shoti server returned an error: ${error.response.status}. Please try again later.`);
    } else if (error.request) {
      wataru.reply("Sorry, I couldn't reach the shoti server. Please check your internet connection and try again.");
    } else {
      wataru.reply("Sorry, I couldn't fetch a shoti video at the moment. Please try again later.");
    }
  }
};
