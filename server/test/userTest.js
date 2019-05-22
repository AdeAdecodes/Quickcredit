import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../app';

chai.use(chaiHttp);
const API_VERSION = '/api/v1';

describe('Testing User Controller', () => {
  describe('Testing signup controller', () => {
    /**
       * Test the POST /auth/signup endpoint
       */
    const signupUrl = `${API_VERSION}/auth/signup`;
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
describe('Testing signin controller', () => {
  /**
     * Test the POST /auth/signin endpoint
     */
  const signinUrl = `${API_VERSION}/auth/signin`;
  it('should login a user if details are correct', (done) => {
    chai.request(app)
      .post(signinUrl)
      .send({
        email: 'test@tester.com',
        password: 'Adeogoadejan',
      })
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body.status).to.be.equal(200);
        done(error);
      });
  });
  it('should not login a user when the email is missing', (done) => {
    chai.request(app)
      .post(signinUrl)
      .send({
        password: 'password',
      })
      .end((error, response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal(400);
        expect(response.body.error).to.be.a('string');
        expect(response.body.error).to.equal('Email is required');
        done();
      });
  });

  it('should not login a user when the password is missing', (done) => {
    chai.request(app)
      .post(signinUrl)
      .send({
        email: 'Adeogo@gmail.com',
      })
      .end((error, response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal(400);
        expect(response.body.error).to.be.a('string');
        expect(response.body.error).to.equal('Password is required');
        done();
      });
  });


  it('should not login a user when the email does not exist', (done) => {
    chai.request(app)
      .post(signinUrl)
      .send({
        email: 'wronil@gmail.com',
        password: 'password',
      })
      .end((error, response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal(401);
        expect(response.body.error).to.be.a('string');
        done();
      });
  });

  it('should not login a user when the email is invalid', (done) => {
    chai.request(app)
      .post(signinUrl)
      .send({
        email: 'wrongemailgmailcom',
        password: 'password',
      })
      .end((error, response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal(400);
        expect(response.body.error).to.be.a('string');
        expect(response.body.error).to.equal('Invalid login details, email or password is wrong');
        done();
      });
  });

  it('should not login a user when the password is wrong', (done) => {
    chai.request(app)
      .post(signinUrl)
      .send({
        email: 'test@tester',
        password: 'wrong password',
      })
      .end((error, response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal(400);
        expect(response.body.error).to.be.a('string');
        expect(response.body.error).to.equal('Invalid login details, email or password is wrong');
        done();
      });
  });
});
