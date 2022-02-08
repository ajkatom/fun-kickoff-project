const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
const { app, server } = require('../app.js');
const User = require('../models/User');

chai.should();
chai.use(chaiHttp);

before((done) => {
  User.deleteMany({}, (err) => {});
  done();
});

describe('auth', () => {
  it('it should return 201 when new user registered', (done) => {
    const user = {
      username: 'John',
      email: 'john@john.com',
      password: 'abcd1234',
    };
    chai
      .request(server)
      .post(`/auth/register`)
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it('should return a 400 if user already exsits', (done) => {
    const user = {
      username: 'John',
      email: 'john@john.com',
      password: 'abcd1234',
    };
    chai
      .request(server)
      .post(`/auth/register`)
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should return a 400 if user data invalid', (done) => {
    const user = {
      username: 'John',
      email: 'johnjohn.com',
      password: 'abcd1234',
    };
    chai
      .request(server)
      .post(`/auth/register`)
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should return a 200 if user successfully logged in', (done) => {
    const loginInfo = {
      email: 'john@john.com',
      password: 'abcd1234',
    };
    chai
      .request(server)
      .post('/auth/login')
      .send(loginInfo)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.success.user.should.be.a('object');
        res.body.success.user.should.have.property('username');
        res.body.success.user.should.have.property('email');
        res.body.success.user.should.have.property('id');
        done();
      });
  });

  it('should return 401 if user isnt registered', (done) => {
    const loginInfo = {
      email: 'doe@doe.com',
      password: 'abcd1234',
    };
    chai
      .request(server)
      .post(`/auth/login`)
      .send(loginInfo)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it('should load user data if user successfully logged in', (done) => {
    const loginInfo = {
      email: 'john@john.com',
      password: 'abcd1234',
    };
    chai
      .request(server)
      .post(`/auth/login`)
      .send(loginInfo)
      .end((err, res) => {
        const setCookie = res.headers['set-cookie'][0];
        const tempArryOne = setCookie.split('=');
        const tempArryTwo = tempArryOne[1].split(';');
        const token = tempArryTwo[0];
        chai
          .request(server)
          .get('/auth/user')
          .set('cookies', token)
          .end((err, res) => {
            res.body.success.user.should.be.a('object');
            res.body.success.user.should.have.property('id');
            res.body.success.user.should.have.property('username');
            res.body.success.user.should.have.property('email');
            expect(res.body.success.user.username).to.be.equal('John');
            expect(res.body.success.user.email).to.be.equal('john@john.com');

            done();
          });
      });
  });
  it('should logout', (done) => {
    chai
      .request(server)
      .get('/auth/logout')
      .end((err, res) => {
        res.should.be.status(200);
        res.text.should.be.equal.to('You have successfully logged out');
        console.log(res.text);
        done();
      });
  });
});
