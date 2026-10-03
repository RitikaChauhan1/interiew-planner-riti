require("dotenv").config()
const app = require("./src/app")
const connectToDB = require("./src/config/database")

async function startServer() {
    if (process.env.NODE_ENV === "production") {
        const requiredEnvironmentVariables = [
            "MONGO_URI",
            "JWT_SECRET",
            "GOOGLE_GENAI_API_KEY",
            "CLIENT_ORIGIN"
        ]
        const missingEnvironmentVariables = requiredEnvironmentVariables.filter(
            (name) => !process.env[name]
        )

        if (missingEnvironmentVariables.length > 0) {
            throw new Error(
                `Missing required production environment variables: ${missingEnvironmentVariables.join(", ")}`
            )
        }
    }

    await connectToDB()

    const port = process.env.PORT || 3000
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
}

startServer()