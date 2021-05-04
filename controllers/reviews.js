const Starport = require("../models/starport");
const Review = require("../models/review");


const createReview = async (req, res) => {
    const starport = await Starport.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    starport.reviews.push(review);
    await review.save();
    await starport.save();
    req.flash("success", "Successfully created new review!");
    res.redirect(`/starports/${starport._id}`);
};


const deleteReview = async (req, res) => {
    await Starport.findByIdAndUpdate(req.params.id, { $pull: { reviews: req.params.reviewId } });
    await Review.findByIdAndDelete(req.params.reviewId);
    req.flash("success", "Successfully deleted review!");
    res.redirect(`/starports/${req.params.id}`);
};



module.exports = {
    createReview,
    deleteReview
};