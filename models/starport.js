const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;


const ImageSchema = new Schema({
    url: String,
    filename: String
});


ImageSchema.virtual("thumbnail").get(function() {
    return this.url.replace("/upload", "/upload/w_200")
});


const opts = { toJSON: { virtuals: true } };

const StarportSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    images: [ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ["Point"],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
}, opts);


StarportSchema.virtual("properties.popUpHtml").get(function() {
    return `<a href="/starports/${this._id}">${this.title}</a>`;
});


StarportSchema.post("findOneAndDelete", async function(doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        });
    }
});


module.exports = mongoose.model("Starport", StarportSchema);