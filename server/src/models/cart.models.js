import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    product_id: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Data"

    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

export const Cart = mongoose.model("Cart", cartSchema)