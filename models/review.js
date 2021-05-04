const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    body: {
        type: String,
        required: true,
        trim: true,
        maxLength: 280
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});


module.exports = mongoose.model("Review", reviewSchema);