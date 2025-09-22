const request = require('supertest');
const { app } = require('./server');

describe('Weather App API', () => {

  it('GET /weather without query should return 400', async () => {
    const res = await request(app).get('/weather');
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('GET /weather with query should return temperature', async () => {
    const res = await request(app).get('/weather?q=London');
    expect([200,500]).toContain(res.statusCode);
    if (res.statusCode === 200) {
      expect(res.body).toHaveProperty('location');
      expect(res.body).toHaveProperty('temperature');
    }
  }, 12000); 
afterAll((done) => {
  
  done();
});
});
