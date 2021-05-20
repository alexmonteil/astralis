const Starport = require("../models/starport");
const { cloudinary } = require("../cloudinary/index");
const mapBoxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mapBoxGeocoding({ accessToken: mapBoxToken });


const index = async (req, res) => {
    const starports = await Starport.find({});
    res.render("starports/index", { starports });
};


const renderNewForm = (req, res) => {
    res.render("starports/new");
};


const createStarport = async (req, res) => {

    const geoData = await geocoder.forwardGeocode({ query: req.body.starport.location, limit: 1}).send();
    const starport = new Starport(req.body.starport);
    starport.geometry = geoData.body.features[0].geometry;
    starport.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    starport.author = req.user._id;
    await starport.save();
    req.flash("success", "Successfully created a new starport!");
    res.redirect(`/starports/${starport._id}`);
    
};



const showStarport = async (req, res) => {
    const starport = await Starport.findById(req.params.id)
    .populate({ path: "reviews", populate: { path: "author "} })
    .populate("author");
    
    if (!starport) {
        req.flash("error", "Cannot find that starport!");
        return res.redirect("/starports");
    }
    res.render("starports/show", { starport });
};



const renderEditForm = async (req, res) => {
    const starport = await Starport.findById(req.params.id);
    if (!starport) {
        req.flash("error", "Cannot find that starport!");
        return res.redirect("/starports");
    }
   
    res.render("starports/edit", { starport });
};



const updateStarport = async (req, res) => {

    const starport = await Starport.findByIdAndUpdate(req.params.id, { ...req.body.starport });
    const images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    starport.images.push(...images);
    await starport.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await starport.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
    }
    req.flash("success", "Successfully updated starport!");
    res.redirect(`/starports/${starport._id}`);

};



const deleteStarport = async (req, res) => {
    const toBeDeleted = await Starport.findByIdAndDelete(req.params.id);
    if (toBeDeleted.images) {
        for (let file of toBeDeleted.images) {
            await cloudinary.uploader.destroy(file.filename);
        }
    }
    req.flash("success", "Successfully deleted starport!");
    res.redirect("/starports");
};



module.exports = {
    index,
    renderNewForm,
    createStarport,
    showStarport,
    renderEditForm,
    updateStarport,
    deleteStarport
};


