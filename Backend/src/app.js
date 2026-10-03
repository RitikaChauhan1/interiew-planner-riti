const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = (process.env.CLIENT_ORIGIN || "")
            .split(",")
            .map((value) => value.trim())
            .filter(Boolean)

        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true)
        }

        if (
            process.env.NODE_ENV !== "production" &&
            /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)
        ) {
            return callback(null, true)
        }

        return callback(new Error("Not allowed by CORS"))
    },
    credentials: true
}))

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" })
})

/* Root endpoint for health check & quick navigation */
app.get("/", (req, res) => {
    const frontendUrl = (process.env.CLIENT_ORIGIN || "http://localhost:5176")
        .split(",")[0]
        .trim()

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Interview AI Backend</title>
            <style>
                body { font-family: system-ui, -apple-system, sans-serif; background: #090d16; color: #e2e8f0; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
                .card { background: #131b2e; border: 1px solid #1e293b; border-radius: 16px; padding: 40px; max-width: 520px; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
                h1 { color: #38bdf8; margin: 0 0 12px 0; font-size: 26px; }
                p { color: #94a3b8; font-size: 15px; line-height: 1.6; margin: 0 0 24px 0; }
                .btn { display: inline-block; background: #38bdf8; color: #090d16; text-decoration: none; font-weight: 700; padding: 12px 28px; border-radius: 8px; transition: transform 0.2s; font-size: 16px; }
                .btn:hover { background: #7dd3fc; transform: translateY(-2px); }
                .badge { display: inline-block; background: #10b98122; color: #34d399; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 600; margin-bottom: 20px; }
                .endpoints { margin-top: 24px; font-size: 13px; color: #64748b; }
            </style>
        </head>
        <body>
            <div class="card">
                <span class="badge">● Backend Server Online</span>
                <h1>Interview AI API</h1>
                <p>You have accessed the backend REST API. To view and interact with the user interface, open the frontend app below:</p>
                <a href="${frontendUrl}" class="btn">Go to Frontend Web App &rarr;</a>
                <div class="endpoints">Available APIs: <code>/api/auth</code> &bull; <code>/api/interview</code></div>
            </div>
        </body>
        </html>
    `)
})

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)



module.exports = app