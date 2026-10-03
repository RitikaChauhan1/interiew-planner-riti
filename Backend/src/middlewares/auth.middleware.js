const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")

async function authUser(req, res, next) {
    const token = req.cookies?.token

    if (!token) {
        return res.status(401).json({
            message: "Token not provided."
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token."
        })
    }

    try {
        const isTokenBlacklisted = await tokenBlacklistModel.findOne({ token })
        if (isTokenBlacklisted) {
            return res.status(401).json({
                message: "token is invalid"
            })
        }
    } catch (err) {
        // If DB is offline, continue or log warning rather than crashing
        console.warn("Blacklist check skipped (DB offline):", err.message)
    }

    next()
}

module.exports = { authUser }