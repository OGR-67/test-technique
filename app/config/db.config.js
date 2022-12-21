require("dotenv").config()

module.exports = {
    HOST: "localhost",
    USER: process.env.PGSQL_USER,
    PASSWORD: process.env.PGSQL_PASSWORD,
    DB: "testdb",
    dialect: "postgres",
    pool: {
        max: 5,           // max number of connection in pool
        min: 0,           // min number of connection in pool
        acquire: 30000,   // maximum time, in milliseconds, that pool will try to get connection before throwing error
        idle: 10000       // maximum time, in milliseconds, that a connection can be idle before being released
    }
};