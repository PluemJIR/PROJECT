module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('RealUserReviews', {
        review: {
            type: DataTypes.STRING(255)
        },
        score: {
            type: DataTypes.INTEGER
        },
        reviewTo: {
            type: DataTypes.INTEGER
        },
        from: {
            type: DataTypes.STRING(255)
        }
    }, {
        tableName: 'RealUserReviews',
        timestamps: false
    });
    model.associate = models => {
        model.belongsTo(models.RealUsers, {
            foreignKey:'user_id'
        })
    }
    
    return model
}