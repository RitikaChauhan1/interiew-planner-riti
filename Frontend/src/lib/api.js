import axios from "axios"

const configuredBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000"
const baseURL = /^https?:\/\//i.test(configuredBaseUrl)
    ? configuredBaseUrl
    : `https://${configuredBaseUrl}`

const api = axios.create({
    baseURL,
    withCredentials: true
})

export default api
