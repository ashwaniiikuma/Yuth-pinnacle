import { Timestamp } from 'mongodb';
import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    UserId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    items:[
        {
            productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
            quantity: {type: Number, required: true, default: 1},
            size: {type:String, required:true }// s,m, l,xl, 
        }
    ]
}, {Timestamp: true});

  export default mongoose.models.cart || mongoose.model('cart', cartSchema);