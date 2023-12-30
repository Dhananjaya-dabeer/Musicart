import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    "brand": {
        type: String,
        required: true
    },
    "model": {
        type: String,
        required: true
    },
    "title": {
        type: String,
        required: true
    },
    "img": {
        type: String,
        required: true
    },
    "img2": {
        type: String,
        required: true
    },
    "img3": {
        type: String,
        required: true
    },
    "reviews":{
        type: Number,
        required: true
    },
    "about": {
        type: Array,
        required: true
    },
    "colour": {
        type: String,
        required: true
    },
    "type":{
        type: String,
        required: true
    },
    "available":{
        type: String,
        required: true
    },
    "price":{
        type: Number,
        required: true
    }
})


export const Data = mongoose.model("Data",dataSchema)
