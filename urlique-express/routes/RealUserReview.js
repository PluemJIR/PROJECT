const express = require('express');
const router = express.Router();
const RealUserReviewControllers = require('../controllers/RealUserReview');
const passport = require('passport')

const authentication = passport.authenticate('jwt', {session: false})

router.get('/', RealUserReviewControllers.getReviews);
router.post('/', authentication, RealUserReviewControllers.addReviews);
router.delete('/:id', RealUserReviewControllers.deleteReviews);

module.exports = router;