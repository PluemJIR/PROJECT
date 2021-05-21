const express =  require('express')
// import data from './data.js'
const cors = require('cors');
const app = express()
const db = require('./models')
const RealUserRoutes =require('./routes/RealUser')
const RealUserReviewRoutes = require('./routes/RealUserReview')
const Reservation = require('./routes/Reservation')

require('./config/passport/passport')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Server is ready')
})

app.use('/reviews', RealUserReviewRoutes)
app.use('/users', RealUserRoutes)
app.use('/reservation', Reservation)

db.sequelize.sync({force: false}).then(() => {
    app.listen(5000, ()=>{
        console.log('Express server is running at 5000')
    })
})
