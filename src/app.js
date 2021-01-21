require('dotenv/config');

const express = require('express');
const mongoose = require('mongoose');
const {ValidationError} = require('express-validation');

const routes = require('./routes');
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
        this.server.use((error, request, response, next) => {
            if (error instanceof ValidationError) {
                return response.status(error.statusCode).json(error);
            }
        })
    }
}

module.exports = new App().server;
