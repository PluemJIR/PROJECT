module.exports = (sequelize, Datatypes) => {
    const model = sequelize.define('Reservation', {
        restaurant: {
            type: Datatypes.STRING(255)
        },
        description: {
            type: Datatypes.STRING(255)
        },
        number: {
            type: Datatypes.INTEGER
        },
        date: {
            type: Datatypes.STRING(255)
        },
        time: {
            type: Datatypes.STRING(255)
        },
        fromUsername : {
            type: Datatypes.STRING(255)
        },
        hashtag : {
            type: Datatypes.STRING(255)
        },
        toId : {
            type: Datatypes.INTEGER
        },
        option : {
            type: Datatypes.STRING(255)
        }
    },{
        tableName: 'Reservations',
    })
    model.associate = models => {
        model.belongsTo(models.RealUsers, {
            foreignKey:'user_id'
        })
    }

    return model
}