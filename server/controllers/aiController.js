import Theater from "../models/Theater.js";
import AddOn from "../models/AddOn.js";
import getClient from "../config/groq.js";

export const generateRecommendation = async (req, res) => {
  try {
    const { occasion, budget, guestCount } = req.body;

    // Validate user input
    if (!occasion || !budget || !guestCount) {
      return res.status(400).json({
        success: false,
        message: "Occasion, budget and guest count are required.",
      });
    }

    const budgetAmount = Number(budget);
    const guests = Number(guestCount);

    if (isNaN(budgetAmount) || isNaN(guests)) {
      return res.status(400).json({
        success: false,
        message: "Budget and guest count must be valid numbers.",
      });
    }

    // Fetch available theatres
    const theaters = await Theater.find({
      maxCapacity: { $gte: guests },
    });

    // Fetch available add-ons
    const addons = await AddOn.find();

    if (theaters.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No theatre is available for this guest count.",
      });
    }

    // Create Groq client
    const groq = getClient();

    // Prepare data for AI
    const prompt = `
You are the AI Experience Planner for Luxe Screens, a private theatre booking website.

The user wants to plan this experience:

Occasion: ${occasion}
Budget: ₹${budgetAmount}
Guest Count: ${guests}

Available theatres:
${JSON.stringify(theaters)}

Available add-ons:
${JSON.stringify(addons)}

Based ONLY on the available theatres and add-ons above, recommend:

1. One suitable theatre.
2. A suitable add-on package containing cakes, decoration and/or gifts.
3. A short reason explaining why this combination is suitable.

Do not invent any theatre, addon, option or price that is not present in the provided data.

Return the response as valid JSON with this structure:

{
  "theater": {
    "name": "theatre name",
    "reason": "short reason"
  },
  "addons": [
    {
      "category": "CAKE",
      "name": "addon name",
      "option": "option name"
    }
  ],
  "summary": "short recommendation summary"
}
`;

    // Send request to Groq
    const response = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const aiResponse = response.choices[0].message.content;

    // Convert AI JSON string into JavaScript object
    let recommendation;

    try {
      recommendation = JSON.parse(aiResponse);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "AI returned an invalid response.",
        rawResponse: aiResponse,
      });
    }

    res.status(200).json({
      success: true,
      recommendation,
    });
  } catch (error) {
    console.error("AI Planner Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate AI recommendation.",
      error: error.message,
    });
  }
};
