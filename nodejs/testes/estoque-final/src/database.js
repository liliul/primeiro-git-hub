const { Sequelize } = require("sequelize")
require('dotenv').config()

class Database {
    constructor() {
        this.init()
    }

    init() {
        this.db = new Sequelize({
            database: process.env.DB_DATABASE,
            host: process.env.DB_HOST,
            username: process.env.DB_USER,
            dialect: "mysql",
            password: process.env.DB_PASSWORD
        })
    }
}

module.exports = new Database()