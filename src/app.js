require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');
const mongodbConfig = require('./config/mongodb');

class App {
    constructor() {
        this.server = express();

        this.middlewares();
        this.database();
        this.routes();
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
}

module.exports = new App().server;
