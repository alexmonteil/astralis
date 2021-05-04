const { starportSchema, reviewSchema, userSchema } = require("./joiSchemas");
const ExpressError = require("./utils/ExpressError");
const Starport = require("./models/starport");
const Review = require("./models/review");


const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash("error", "You must be signed in");
        return res.redirect("/login");
    }

    next();
};


const isAuthor = async (req, res, next) => {
    const starport = await Starport.findById(req.params.id);
    if (!starport.author.equals(req.user._id)) {
        req.flash("error", "Unauthorized action");
        return res.redirect(`/starports/${req.params.id}`);
    }

    next();
};


const isReviewAuthor = async (req, res, next) => {
    const review = await Review.findById(req.params.reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash("error", "Unauthorized action");
        return res.redirect(`/starports/${id}`);
    }

    next();
};


const validateStarport = (req, res, next) => {

    const { error } = starportSchema.validate(req.body);

    if (error) {
        const msg = error.details.map(element => element.message).join(",");
        throw new ExpressError(msg, 400);
    }

    next();
};


const validateReview = (req, res, next) => {

    const { error } = reviewSchema.validate(req.body);

    if (error) {
        const msg = error.details.map(element => element.message).join(",");
        throw new ExpressError(msg, 400);
    }

    next();
};


const validateUser = (req, res, next) => {

    const { error } = userSchema.validate(req.body);

    if (error) {
        const msg = error.details.map(element => element.message).join(",");
        throw new ExpressError(msg, 400);
    }

    next();

};



module.exports = {
    isLoggedIn,
    isAuthor,
    isReviewAuthor,
    validateStarport,
    validateReview,
    validateUser
};