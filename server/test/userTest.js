import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../app';

chai.use(chaiHttp);
const API_VERSION = '/api/v1';
const testUser = {
  id: 1,
  email: 'tt@tester.com',
  firstName: 'Adeogo',
  lastName: 'Adejana',
  homeAddress: 'Victoria island',
  workAddress: 'yaba',
  phoneNumber: '08066256070',
  password: 'yabayaba',
  confirmPassword: 'yabayaba'
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
          expect(response.body.data).to.have.property('id');
          expect(response.body.data).to.have.property('firstName');
          expect(response.body.data).to.have.property('lastName');
          expect(response.body.data).to.have.property('email');
          expect(response.body.data).to.have.property('homeAddress');
          expect(response.body.data).to.have.property('workAddress');
          expect(response.body.data).to.have.property('phoneNumber');

          done(error);
        });
    });
    it('should not register a user when the email is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          firstName: 'Adeogo',
          lastName: 'Adejana',
          homeAddress: 'Victoria island',
          workAddress: 'yaba',
          phoneNumber: '08066256070',
          password: 'password',
          confirmPassword: 'password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Email is required');
          done(error);
        });
    });

    it('should not register a user when the first name is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          lastName: 'Adeogo',
          email: 'test@test.com',
          homeAddress: 'Victoria island',
          workAddress: 'yaba',
          password: 'password',
          confirmPassword: 'password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('First name is required');
          done(error);
        });
    });


    it('should not register a user when the last name is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          firstName: 'Adeogo',
          email: 'test@test.com',
          homeAddress: 'Victoria island',
          workAddress: 'yaba',
          phoneNumber: '08066256070',
          password: 'password',
          confirmPassword: 'password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Last name is required');
          done(error);
        });
    });
    it('should not register a user when the password is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          firstName: 'Adeogo',
          lastName: 'Adejana',
          email: 'test@tester.com',
          homeAddress: 'Victoria island',
          workAddress: 'yaba',
          phoneNumber: '08066256070',
          password: '',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Password is required');
          done(error);
        });
    });
    it('should not register a user when the home address is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          firstName: 'Adeogo',
          lastName: 'Adejana',
          email: 'test@tester.com',
          homeAddress: '',
          workAddress: 'yaba',
          phoneNumber: '08066256070',
          password: 'password',
          confirmPassword: 'password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Home Address is required');
          done(error);
        });
    });
    it('should not register a user when the work address is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          firstName: 'Adeogo',
          lastName: 'Adejana',
          email: 'test@tester.com',
          homeAddress: 'yaba',
          workAddress: '',
          phoneNumber: '08066256070',
          password: 'password',
          confirmPassword: 'password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Work Address is required');
          done(error);
        });
    });

    it('should not register a user when the phone number is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          firstName: 'Adeogo',
          lastName: 'Adejana',
          email: 'test@tester.com',
          homeAddress: 'yaba',
          workAddress: 'victoria island',
          phoneNumber: '',
          password: 'password',
          confirmPassword: 'password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Phone Number is required');
          done(error);
        });
    });

    it('should not register a user when the passwords do not match', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          firstName: 'Adeogo',
          lastName: 'Adejana',
          email: 'test@tester.com',
          homeAddress: 'Victoria island',
          workAddress: 'yaba',
          phoneNumber: '08066256070',
          password: 'password',
          confirmPassword: 'Passwords do not match',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Passwords do not match');
          done(error);
        });
    });

    it('should not register a user when the email already exists', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          firstName: 'Adeogo',
          lastName: 'Adejana',
          email: 'test@tester.com',
          homeAddress: 'Victoria island',
          workAddress: 'yaba',
          phoneNumber: '08066256070',
          password: 'password',
          confirmPassword: 'password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Email already exists');
          done(error);
        });
    });

    it('should not register a user when the email is not valid', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          firstName: 'Adeogo',
          lastName: 'Adejana',
          email: 'testett',
          homeAddress: 'Victoria island',
          workAddress: 'yaba',
          address: 'yaba',
          phoneNumber: '08066256070',
          password: 'password',
          confirmPassword: 'password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Invalid email address');
          done(error);
        });
    });
  });
});
