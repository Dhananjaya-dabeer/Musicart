import { asyncHandler } from "../utils/asyncHandler.js";

export const health = asyncHandler((req,res) => [
    res.json({
        message: "server is up and running"
    })
])

export const register = asyncHandler((req,res) => {
    
})

export const signin = asyncHandler((req, res) => {
    
})