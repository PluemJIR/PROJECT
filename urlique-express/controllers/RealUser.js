const db = require('../models')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const getUsers = async (req, res) => {
    const users = await db.RealUsers.findAll()
    res.status(200).send(users);
};

const getUserByUsername = async (req, res) => {
    const targetUsername = (req.params.username);
    const targetUser = await db.RealUsers.findOne({ where: { username: targetUsername } });
    res.status(200).send(targetUser);
};

const registerUser = async (req, res) => {
    const { username, password, name, hashtag, email, description, pri } = req.body;
    const targetUser = await db.RealUsers.findOne({ where: { username: username } })
    if (targetUser) {
        res.status(400).send({ message: 'Username already taken' })
    } else {
        const salt = bcryptjs.genSaltSync(12);
        const hashedPassword = bcryptjs.hashSync(password, salt)

        await db.RealUsers.create({
            username: username,
            password: hashedPassword,
            name: name,
            hashtag: hashtag,
            email: email,
            description: description,
        })

        res.status(201).send({ message: 'User created' })
    }
}


const loginUser = async (req, res) => {
    const { username, password } = req.body
    const targetUser = await db.RealUsers.findOne({ where: { username: username } })
    if (!targetUser) {
        res.status(400).send({ message: 'Username or Password is wrong' })
    } else {
        const isCorrectPassword = bcryptjs.compareSync(password, targetUser.password)
        if (isCorrectPassword) {
            const payload = {
                name: targetUser.username,
                id: targetUser.id,
                hashtag: targetUser.hashtag,
            }
            const token = jwt.sign(payload, 'urlique', { expiresIn: 3600 })

            res.status(200).send({
                token: token,
                message: 'Login Successful'
            })
        } else {
            res.status(400).send({ message: 'Username or Password is wrong' })
        }
    }
    res.send('Login')
}

const updateProfile = async (req, res) => {
    const targetUsername = (req.user.id);
    const targetUser = await db.RealUsers.findOne({ where: { id: targetUsername } });
    const newDescription = req.body.description
    const newPriceRateP = req.body.priceratePerson
    const newPriceRateT = req.body.pricerateTime
    const newHashtag = req.body.hashtag
    if (targetUser) {
        await targetUser.update({
            hashtag: newHashtag,
            description: newDescription,
            priceratePerson: newPriceRateP,
            pricerateTime: newPriceRateT
        })
        res.status(200).send('Success')
    }
    // else {
    //     res.status(404).send({message:'Fail'})
    // }
}

module.exports = {
    registerUser,
    loginUser,
    getUsers,
    getUserByUsername,
    updateProfile
}
