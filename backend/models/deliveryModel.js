import mongoose from "mongoose";

const deliverySchema = mongoose.Schema(
    {
       //new
        Address:{
            type: String,
            required: true,
        },
        ProductName:{
            type: String,
            required: true,
        },
        Price: {
            type : Number,
            required : true,
        },
        Quantity: {
            type : Number,
            required : true,
        },
        PostalCode: {
            type : Number,
            required : true,
        },
        SenderName:{
            type: String,
            required: true,
        },
        ContactNumber:{
            type: String,
            required: true,
        },

    },
    {
        timestamps: true,
    }
);

export const Delivery = mongoose.model('Delivery', deliverySchema);

