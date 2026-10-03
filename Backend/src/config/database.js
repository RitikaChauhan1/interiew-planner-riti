const mongoose = require("mongoose")
const { MongoMemoryServer } = require("mongodb-memory-server")

let memoryServer = null

async function connectToInMemoryMongo() {
    memoryServer = await MongoMemoryServer.create({
        binary: {
            version: "7.0.14"
        }
    })

    await mongoose.connect(memoryServer.getUri(), {
        serverSelectionTimeoutMS: 5000
    })

    console.log("MongoDB connected successfully via in-memory fallback ✅")
}

async function connectToDB() {
    if (mongoose.connection.readyState === 1) {
        return
    }

    if (!process.env.MONGO_URI) {
        if (process.env.NODE_ENV === "production") {
            throw new Error("MONGO_URI is required in production.")
        }

        console.warn("⚠️ MONGO_URI is not set in .env. Trying in-memory MongoDB fallback...")
        await connectToInMemoryMongo()
        return
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000
        })

        console.log("MongoDB connected successfully ✅")
    } catch (err) {
        console.warn("MongoDB connection error ❌:", err.message)

        if (process.env.NODE_ENV === "production") {
            throw err
        }

        console.warn("Falling back to in-memory MongoDB for local development...")
        await connectToInMemoryMongo()
    }
}

module.exports = connectToDB