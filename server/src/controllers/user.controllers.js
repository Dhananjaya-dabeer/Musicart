import { asyncHandler } from "../utils/asyncHandler.js";
import jsonData from "../../../data.json" assert { type: 'json' };
import mongoose from "mongoose";
import { Data } from "../models/data.models.js";

export const health = asyncHandler(async(req,res) => {
  const result = await Data.insertMany(jsonData)
    res.json({
        message: "server is up and running",
        data: result
    })
    console.log(result)
})

export const data = asyncHandler(async(req, res) => {
    const result = await Data.find()
    res.status(200).json({
        message: "Success",
        data: result
    })
})
export const register = asyncHandler((req,res) => {
    
})

export const signin = asyncHandler((req, res) => {
    
})