const express = require('express');
const router = express.Router();
const ReservationControllers = require('../controllers/Reservation');
const passport = require('passport')

const authentication = passport.authenticate('jwt', {session: false})

router.get('/', ReservationControllers.getReservation);
router.post('/',authentication, ReservationControllers.addReservation);
router.delete('/:id', authentication, ReservationControllers.deleteReservation)
router.put('/:id', authentication, ReservationControllers.updateReservation)

module.exports = router;