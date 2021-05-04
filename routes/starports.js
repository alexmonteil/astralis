const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAuthor, validateStarport } = require("../middleware");
const starportsController = require("../controllers/starports");
const multer  = require('multer');
const { storage } = require("../cloudinary");
const upload = multer({ 
    storage,
    limits: {
        fileSize: 5000000,
        files: 4
    }
 });


// starports routes

router.get("/", catchAsync(starportsController.index));
router.get("/new", isLoggedIn, starportsController.renderNewForm);
router.post("/", isLoggedIn, upload.array("image"), validateStarport, catchAsync(starportsController.createStarport));
router.get("/:id", catchAsync(starportsController.showStarport));
router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(starportsController.renderEditForm));
router.put("/:id", isLoggedIn, isAuthor,  upload.array("image"), validateStarport, catchAsync(starportsController.updateStarport));
router.delete("/:id", isLoggedIn, isAuthor, catchAsync(starportsController.deleteStarport));



module.exports = router;