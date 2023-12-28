import { asyncHandler } from "../utils/asyncHandler.js";

import mongoose from "mongoose";
import { Data } from "../models/data.models.js";
import { User } from "../models/user.models.js";
export const health = asyncHandler(async(req,res) => {
  
    res.json({
        message: "server is up and running",
       
    })
    
})

export const data = asyncHandler(async(req, res) => {
    const result = await Data.find()

    const { search, brand, colour, price, hedphoneType, sort } = req.query
    const convertedPrice = price.split(",")
    let sortedResult
    if(sort == "Lowest")  sortedResult = result.sort((a, b) => a.price - b.price)
    if(sort == "Highest") sortedResult = result.sort((a, b) => b.price - a.price)
    if(sort == "A-Z") sortedResult = result.sort((a, b) => a.model.localeCompare(b.model));
    if(sort == "Z-A") sortedResult = result.sort((a, b) => b.model.localeCompare(a.model));
 

   

  const filteredResults = result.filter((item) => {
    const isModelMatch = !search || item.model.trim().toLowerCase().includes(search.trim().toLowerCase());
    const isBrandMatch = !brand || item.brand.trim().toLowerCase() === brand.trim().toLowerCase();
    const isColourMatch = !colour || item.colour.trim().toLowerCase().includes(colour.trim().toLowerCase());
    const isPriceMatch = !price || (item.price > parseInt(convertedPrice[0]) && item.price < parseInt(convertedPrice[1]))
    const isHeadphoneMatch = !hedphoneType || item.type.trim().toLowerCase().includes(hedphoneType.trim().toLowerCase())
    const isSortMatch = !sort || sortedResult
    return isModelMatch && isBrandMatch && isColourMatch && isPriceMatch && isHeadphoneMatch && isSortMatch;
  });
  res.status(200).json({
    status: "success",
    data: result,
    filteredResults: filteredResults
  })
  
})
export const register = asyncHandler(async(req,res) => {
   const {name, mobile, email, password } = req.body
   const dupVerification = await User.findOne({email})
  const dupVerification2 = await User.findOne({mobile})
   if(dupVerification  || dupVerification2){
   return  res.json({
      status: "Failed",
      message: dupVerification && "email is registered with us! Please try to use different email" || dupVerification2 && "number is registered with us! Please try to use different number"
    })
   }
   const newUser = await User.create({name, mobile, email, password})
   const token = newUser.generateAccessToken()
   console.log(token)
  return res.json({
    status: "Success",
    message: "successfully registered and loggedin",
    token: token,
    userName: newUser.name
   })
})

export const signin = asyncHandler(async(req, res) => {
    const {email_mobile, password} = req.body
    if(!email_mobile || !password) return res.json({message: "both fields are required!"})
    const mobile = parseInt(email_mobile)
    let existingUser
    if(isNaN(mobile)){
       existingUser = await User.findOne({email:email_mobile})
    }else{
       existingUser = await User.findOne({mobile: mobile})
    }
    console.log(existingUser.name)
   
    if(!existingUser){
   return   res.json({
        status: "Failed",
        message: "You are not registered with us! Please signup"
      })
    }
    else if(await existingUser.isPasswordCorrect(password)) {
      const token = existingUser.generateAccessToken()
      console.log(token,existingUser.name)
     return res.json({
        status:"success",
        message: "Loggedin successfully",
        token: token,
        userName: existingUser.name
    })
    }
    else{
      return res.json({
        message: "incorrect password"
      })
    }
    
})