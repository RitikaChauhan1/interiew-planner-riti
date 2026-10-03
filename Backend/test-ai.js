require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

async function testAI() {
    const key = process.env.GOOGLE_GENAI_API_KEY;
    if (!key || key.trim() === "" || key === "placeholder_api_key") {
        console.log("❌ GOOGLE_GENAI_API_KEY is empty or missing in Backend/.env");
        console.log("👉 Please paste your Gemini API key in Backend/.env");
        return;
    }

    console.log("🔑 API key found (length: " + key.length + "). Connecting to Gemini...");

    const ai = new GoogleGenAI({ apiKey: key });

    // Test simple generation
    const modelsToTry = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash", "gemini-3-flash-preview"];
    
    for (const model of modelsToTry) {
        try {
            console.log(`\nTesting model '${model}'...`);
            const response = await ai.models.generateContent({
                model: model,
                contents: "Say 'AI connection successful!' in one short sentence."
            });
            console.log(`✅ Success with '${model}'! Response:`, response.text?.trim());
            break;
        } catch (err) {
            console.log(`⚠️ Model '${model}' failed:`, err.message || err);
        }
    }
}

testAI();
