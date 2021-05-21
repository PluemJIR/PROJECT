const db = require("../models");

const getReviews = async (req, res) => {

    const reviews = await db.RealUserReviews.findAll()
    res.status(200).send(reviews);
};

const addReviews = async (req, res) => {
    const newReviews = await db.RealUserReviews.create({
        review: req.body.review,
        score: req.body.score,
        user_id: req.user.id,
        reviewTo: req.body.to,
        from: req.user.username
    })

    res.status(201).send(newReviews);
};

const deleteReviews = async (req, res) => {
    const targetId = Number(req.params.id);
    await db.RealUserReviews.destroy({
        where: {id : targetId}
    })
    res.status(204).send();
};

module.exports = {
    addReviews,
    getReviews,
    deleteReviews
};
