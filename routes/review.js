const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn, isAuthor } = require("../middelware.js");
const reviewController = require("../controllers/review.js");

//post route

router.post(
  "/",
  validateReview,
  isLoggedIn,
  wrapAsync(reviewController.review)
);

//review delete route

router.delete(
  "/:reviewId",
  isLoggedIn,
  isAuthor,
  wrapAsync(reviewController.deleteReview)
);

module.exports = router;
