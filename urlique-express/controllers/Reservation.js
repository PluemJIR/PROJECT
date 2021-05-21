const db = require("../models");

const getReservation = async (req, res) => {

    const reservations = await db.Reservation.findAll()
    res.status(200).send(reservations);
};

const addReservation = async (req, res) => {
    const newReservation = await db.Reservation.create({
        restaurant : req.body.restaurant,
        description : req.body.description,
        number : req.body.number,
        date : req.body.date,
        time : req.body.time,
        fromUsername : req.user.username,
        hashtag : req.body.hashtag,
        toId : req.body.toId,
        option : req.body.option,
        user_id: req.user.id
    })

    res.status(201).send(newReservation);
};

const deleteReservation = async (req, res) => {
    const targetId = Number(req.params.id);
    const targetBooking = await db.Reservation.findOne({where: {id : targetId}})
    if (targetBooking) {
        await targetBooking.destroy();
        res.status(204).send()
    }
};

const updateReservation = async (req, res) => {
    const targetId = Number(req.params.id);
    const targetBooking = await db.Reservation.findOne({where: {id : targetId}})
    const newStatus = req.body.option
    if (targetBooking) {
        await targetBooking.update({
            option: newStatus
        })
        res.status(200).send()
    }
}



module.exports = {
    getReservation,
    addReservation,
    deleteReservation,
    updateReservation
};
