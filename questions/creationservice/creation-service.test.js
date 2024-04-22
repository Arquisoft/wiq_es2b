const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;
let app;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGODB_URI = mongoUri;
  app = require('./createquestion-service'); 
});

afterAll(async () => {
    app.close();
    await mongoServer.stop();
});

describe('Retrieve Service', () => {
  it('should add a new user on GET /createquestion', async () => {

    const response = await request(app).get('/createquestion');
    expect(response.status).toBe(200);
  });
});