require('dotenv/config');

const express = require('express');
const mongoose = require('mongoose');
const {ValidationError} = require('express-validation');
const Youch = require('youch');

const routes = require('./routes');
const EnviromentUtils = require('./utils/Enviroment');
const mongodbConfig = require('./config/mongodb');

class App {
    constructor() {
        this.server = express();

        this.middlewares();
        this.database();
        this.routes();
        this.exeception();
    }

    middlewares() {
        this.server.use(express.json());
    }

    database() {
        mongoose.connect(mongodbConfig.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }

    routes() {
        this.server.use('/api', routes);
    }

    exeception() {
        this.server.use(async (error, request, response, next) => {
            if (error instanceof ValidationError) {
                return response.status(error.statusCode).json(error);
            }

            if (EnviromentUtils.isDevelopment()) {
                const youch = new Youch(error, request);
                return response.status(error.statusCode || 500).json(await youch.toJSON());
            }

            return response.status(500).json({ error: 'Server Internal Error' });
        })
    }
}

module.exports = new App().server;
