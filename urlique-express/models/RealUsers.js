module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('RealUsers', {
        username:{
            type: DataTypes.STRING(200),
            unique: true
        },
        password:{
            type: DataTypes.STRING(255)
        },
        name: {
            type: DataTypes.STRING(255)
        },
        hashtag: {
            type: DataTypes.STRING(255)
        },
        email: {
            type: DataTypes.STRING(255)
        },
        description: {
            type: DataTypes.STRING(255)
        },
        priceratePerson: {
            type: DataTypes.INTEGER
        },
        pricerateTime: {
            type: DataTypes.INTEGER
        }
    },{
        tableName: 'RealUsers',
        timestamps: false
    })
    
    model.associate = models => {
        model.hasMany(models.RealUserReviews, {
            foreignKey: 'user_id'
        })
        model.hasMany(models.Reservation, {
            foreignKey: 'user_id'
        })
    }

    return model
}