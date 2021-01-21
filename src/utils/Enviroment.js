class Enviroment {
    static isDevelopment() {
        return process.env.NODE_ENV === 'development';
    }

    static isProduction() {
        return process.env.NODE_ENV === 'production';
    }

    static isTest() {
        return process.env.NODE_ENV === 'test';
    }
}

module.exports = Enviroment;
