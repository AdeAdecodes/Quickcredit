import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../app';

chai.use(chaiHttp);
const API_VERSION = '/api/v1';
const testUser = {
  id: 67,
  firstName: 'Adeogo',
  lastName: 'Adejana',
  email: 'test@tester.com',
  address: 'yaba',
  password: 'password',
  confirmPassword: 'password',
};

describe('Testing User Controller', () => {
  describe('Testing signup controller', () => {
    /**
       * Test the POST /auth/signup endpoint
       */
    const signupUrl = `${API_VERSION}/auth/signup`;
    it('should register a new user when all the parameters are given', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send(testUser)

        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response).to.have.status(201);
          expect(response.body.status).to.equal(201);
          expect(response.body.data).to.be.a('object');
          expect(response.body.data).to.have.property('token');
          expect(response.body.data).to.have.property('id');
          expect(response.body.data).to.have.property('firstName');
          expect(response.body.data).to.have.property('lastName');
          expect(response.body.data).to.have.property('email');
          expect(response.body.data.token).to.be.a('string');
          expect(response.body.data.email).to.equal('test@tester.com');
          done();
        });
    });

    it('should not register a user when the email is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          firstName: 'Adeogo',
          lastName: 'Adejana',
          address: 'yaba',
          password: 'password',
          confirmPassword: 'password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Email is required');
          done();
        });
    });

    it('should not register a user when the first name is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          lastName: 'Adeogo',
          email: 'test@test.com',
          address: 'yaba',
          password: 'password',
          confirmPassword: 'password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('First name is required');
          done();
        });
    });


    it('should not register a user when the last name is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          firstName: 'Adeogo',
          email: 'test@test.com',
          address: 'yaba',
          password: 'password',
          confirmPassword: 'password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Last name is required');
          done();
        });
    });

    it('should not register a user when the password is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          firstName: 'Adeogo',
          lastName: 'Adejana',
          email: 'test@tester.com',
          address: 'yaba',
          confirmPassword: 'password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Password is required');
          done();
        });
    });

    it('should not register a user when the passwords do not match', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          firstName: 'Adeogo',
          lastName: 'Adejana',
          email: 'test@tester.com',
          address: 'yaba',
          password: 'password',
          confirmPassword: 'Passwords do not match',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Passwords do not match');
          done();
        });
    });

    it('should not register a user when the email already exists', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          firstName: 'Adeogo',
          lastName: 'Adejana',
          email: 'test@tester.com',
          address: 'yaba',
          password: 'password',
          confirmPassword: 'password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Email already exists');
          done();
        });
    });

    it('should not register a user when the email is not valid', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          firstName: 'Adeogo',
          lastName: 'Adejana',
          email: 'testester.com',
          address: 'yaba',
          password: 'password',
          confirmPassword: 'password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Invalid email address');
          done();
        });
    });
  });
})
