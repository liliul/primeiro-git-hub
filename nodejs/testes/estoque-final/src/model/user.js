const database = require('../database')
const Organizition = require('./organization')

class User {
    constructor() {
        this.model = database.db.define("users", {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: database.db.Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: database.db.Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: database.db.Sequelize.STRING,
                allowNull: false
            },
            role: {
                type: database.db.Sequelize.STRING,
                allowNull: false
            },
            organizationId: {
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: Organizition,
                    key: "id"
                }
            },
        })

        this.model.belongsTo(Organizition, {
            foreignKey: 'organizationId'
        })
        Organizition.hasMany(this.model, {
            foreignKey: 'organizationId'
        })
    }
}

module.exports = new User().model