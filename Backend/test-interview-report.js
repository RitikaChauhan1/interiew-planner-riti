require("dotenv").config();
const { generateInterviewReport } = require("./src/services/ai.service");

async function testReport() {
    console.log("🚀 Testing generateInterviewReport()...");
    try {
        const result = await generateInterviewReport({
            resume: "Full Stack Developer with 3 years of experience in React, Node.js, Express, and MongoDB. Built scalable web applications.",
            selfDescription: "Passionate developer looking for a Senior Frontend or Full Stack role.",
            jobDescription: "Looking for a Senior Full Stack Engineer proficient in React, Node.js, TypeScript, and cloud services (AWS/GCP)."
        });

        console.log("\n✅ AI Interview Report Generated Successfully!");
        console.log("Match Score:", result.matchScore);
        console.log("Job Title:", result.title);
        console.log("Technical Questions:", result.technicalQuestions?.length);
        if (result.technicalQuestions && result.technicalQuestions.length > 0) {
            console.log(" Sample Question 1:", result.technicalQuestions[0].question);
        }
        console.log("Behavioral Questions:", result.behavioralQuestions?.length);
        console.log("Skill Gaps:", result.skillGaps?.map(s => `${s.skill} (${s.severity})`).join(", "));
        console.log("Preparation Plan (Days):", result.preparationPlan?.length);
    } catch (err) {
        console.error("❌ Error generating report:", err);
    }
}

testReport();
