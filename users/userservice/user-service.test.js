const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const bcrypt = require('bcrypt');
const User = require('./user-model');

let mongoServer;
let app;

async function addUser(user){
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = new User({
    username: user.username,
    password: hashedPassword,
  });

  await newUser.save();
}

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGODB_URI = mongoUri;
  app = require('./user-service'); 
});

afterAll(async () => {
    app.close();
    await mongoServer.stop();
});

describe('User Service', () => {
  //
  it('should add a new user on POST /adduser', async () => {
    const newUser = {
      username: 'testuser',
      password: 'testpassword',
    };

    const response = await request(app).post('/adduser').send(newUser);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('username', 'testuser');
  });

  //
  it('trying to add a user without username', async () => {
    const newUser = {
      password: 'testpassword',
    };

    const response = (await request(app).post('/adduser').send(newUser));
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty( "error" , "Missing required field: username" );
  });

  //
  it('should get the registered users on /getregisteredusers', async () => {
    addUser(user = {
      username: 'testuser',
      password: 'testpassword',
    });
    const response = await request(app).get('/getregisteredusers');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(Array.from(response.body[0])[0]).toBe('testuser');
  });
});
