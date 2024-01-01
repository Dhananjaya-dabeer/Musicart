import { asyncHandler } from "../utils/asyncHandler.js";


import { Data } from "../models/data.models.js";
import { User } from "../models/user.models.js";
import { Cart } from "../models/cart.models.js";
export const health = asyncHandler(async (req, res) => {

  res.json({
    message: "server is up and running",

  })

})

export const data = asyncHandler(async (req, res) => {
  const result = await Data.find()
  const { productIds } = req.query
  const { search, brand, colour, price, hedphoneType, sort } = req.query
  if (!productIds) {
    const convertedPrice = price.split(",")
    let sortedResult
    if (sort == "Lowest") sortedResult = result.sort((a, b) => a.price - b.price)
    if (sort == "Highest") sortedResult = result.sort((a, b) => b.price - a.price)
    if (sort == "A-Z") sortedResult = result.sort((a, b) => a.model.localeCompare(b.model));
    if (sort == "Z-A") sortedResult = result.sort((a, b) => b.model.localeCompare(a.model));




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
  }
  else if (productIds) {
    // console.log(productIds)

    const result2 = await Data.find({ _id: { $in: productIds.split(",") } })
    return res.json({
      cartItems: result2
    })
  }

})
export const register = asyncHandler(async (req, res) => {
  const { name, mobile, email, password } = req.body
  const dupVerification = await User.findOne({ email })
  const dupVerification2 = await User.findOne({ mobile })
  if (dupVerification || dupVerification2) {
    return res.json({
      status: "Failed",
      message: dupVerification && "email is registered with us! Please try to use different email" || dupVerification2 && "number is registered with us! Please try to use different number"
    })
  }
  const newUser = await User.create({ name, mobile, email, password })
  const token = newUser.generateAccessToken()
  console.log(token)
  return res.json({
    status: "Success",
    message: "successfully registered and loggedin",
    token: token,
    userName: newUser.name
  })
})

export const signin = asyncHandler(async (req, res) => {
  const { email_mobile, password } = req.body
  if (!email_mobile || !password) return res.json({ message: "both fields are required!" })
  const mobile = parseInt(email_mobile)
  let existingUser
  if (isNaN(mobile)) {
    existingUser = await User.findOne({ email: email_mobile })
  } else {
    existingUser = await User.findOne({ mobile: mobile })
  }
  console.log(existingUser.name)

  if (!existingUser) {
    return res.json({
      status: "Failed",
      message: "You are not registered with us! Please signup"
    })
  }
  else if (await existingUser.isPasswordCorrect(password)) {
    const token = existingUser.generateAccessToken()
    console.log(token, existingUser.name)
    return res.json({
      status: "success",
      message: "Loggedin successfully",
      token: token,
      userName: existingUser.name,
      userId: existingUser._id
    })
  }
  else {
    return res.json({
      message: "incorrect password"
    })
  }

})

export const cart = asyncHandler(async (req, res) => {
  const { product_id, userId } = req.body


  if (product_id && userId) {
    const targetUserCart = await Cart.findOne({ userId });

    const query = {
      userId
    }
    const update = {
      $set: {
        product_id: targetUserCart?.product_id.length ? [...targetUserCart.product_id, product_id] : [product_id]
      }
    };

    const options = {
      upsert: true
    }

    if (!targetUserCart?.product_id?.includes(product_id)) await Cart.updateOne(query, update, options)
    if (targetUserCart?.product_id?.includes(product_id)) {
      return res.json({
        status: "Failed",
        message: "product is already added to cart. you can change quantity in cart"
      })
    }



  }
  const getRequest = await Cart.find()
  return res.json({
    status: "Success",
    cartItems: getRequest,

  })

})

export const deleteCart = asyncHandler(async(req, res) => {
  const { userId } = req.body
  console.log(userId)
  const condition = {userId: userId}

  const update = { $set: { product_id:[] } }

  const options = {
    new: true
  }
    if(userId){
    const updatedDocument = await Cart.findOneAndUpdate(condition, update, options)
     try {
       console.log("Documet updated Successfully", updatedDocument)
       res.status(200).json({status: "Success", data: updatedDocument})
     } catch (error) {
        console.log(error)
        res.status(200).json({status: "failed", data: "server error"})
     }

    }
    else{
      res.status(400).json({ status: "failed", data: "invalid userid"})
    }

})