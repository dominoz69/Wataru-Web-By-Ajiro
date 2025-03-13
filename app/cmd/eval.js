const axios = require("axios");

exports.meta = {
  name: "eval",
  version: "1.0.0",
  description: "Evaluates JavaScript code",
  category: "developer",
  prefix: "both",
  guide: "Type /eval [code] to execute JavaScript code",
};

exports.onStart = async ({ wataru, args }) => {
  if (!args.length) {
    return wataru.reply("Please provide code to evaluate.");
  }

  const code = args.join(" ");
  
  try {
    const result = eval(code);
    const resultString = typeof result === 'object' ? 
      JSON.stringify(result, null, 2) : 
      String(result);
    
    wataru.reply(`${resultString}`);
  } catch (error) {
    wataru.reply(`${error.message}`);
  }
};
