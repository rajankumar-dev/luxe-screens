import Groq from "groq-sdk";

const getClient = () => {
  console.log("GROQ KEY:", process.env.GROQ_API_KEY ? "Loaded" : "Missing");

  return new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });
};

export default getClient;
