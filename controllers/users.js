const User = require("../models/user");



const renderRegisterForm = (req, res) => {
    res.render("users/register");
};



const registerUser = async (req, res) => {

    try {

        const { username, email, password } = req.body;
        const user = new User({ username, email });
        const registeredUser =  await User.register(user, password);
        req.login(registeredUser, error => {
            if (error) {
                return next(error);
            }

            req.flash("success", "Welcome to Astralis!");
            res.redirect("/starports");
        });

    } catch(error) {

        req.flash("error", error.message);
        res.redirect("register");

    }

};



const renderLoginForm = (req, res) => {
    res.render("users/login");
};



const loginUser = (req, res) => {
    req.flash("success", "Welcome back!");
    const redirectUrl = req.session.returnTo || "/starports";
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};



const logoutUser = (req, res) => {
    req.logout();
    req.flash("success", "Goodbye!");
    res.redirect("/login");
};



module.exports = {
    renderRegisterForm,
    registerUser,
    renderLoginForm,
    loginUser,
    logoutUser
};