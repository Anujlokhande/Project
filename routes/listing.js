const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middelware.js");
const listingController = require("../controllers/listing.js");

router
  .route("/")
  .get(wrapAsync(listingController.index)) //index
  .post(isLoggedIn, wrapAsync(listingController.createListing)); //create new listing -- post

//create route
router.get("/new", isLoggedIn, wrapAsync(listingController.renderNewForm));

//update route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editForm)
);

//id
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing)) //show listing
  .put(
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.update) //update Listing -- post
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing)); // delete listing -- delete

module.exports = router;
