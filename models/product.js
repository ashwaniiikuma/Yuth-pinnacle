import { Timestamp } from 'mongodb';
import mongoose from 'mongoose';
import { MdDescription } from 'react-icons/md';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String
    },
    price: {
        type:  Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    images: [{
        type: String
    }],
    sizes: [{
        type: String
    }],
    stock: {type: Number, required: true, default: 0},
}, {Timestamp: true});

export default  mongoose.models.Product || mongoose.model("Product", productSchema);