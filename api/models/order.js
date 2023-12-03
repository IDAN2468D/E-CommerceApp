const mongoose = require("mongoose");

const orderScheme = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    products: [
        {
            name: {
                name: String,
                required: true
            },
            quantity: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            },
        },
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    shippingAddress: {
        name: {
            type: String,
            required: true
        },
        mobileNo: {
            type: String,
            required: true
        },
        houseNo: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        landmark: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        }
    },
    paymentMethod: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

const Order = mongoose.model("User", orderScheme)

module.exports = Order