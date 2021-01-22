const request = require('supertest');
const app = require('../../src/app');

const User = require('../../src/app/models/UserModel');


describe('User', () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });

    it('should create a new user', async () => {
        const user = {
            username: 'developerantoniosousa',
            password: '123123'
        }

        const response = await request(app).post('/api/users').send(user);
        return expect(response.body).toHaveProperty('_id');
    });
});
