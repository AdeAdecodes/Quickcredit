import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../app';

chai.use(chaiHttp);
const API_VERSION = '/api/v1';
const testUser = {
  email: 'tt@tester.com',
  firstName: 'Adeogo',
  lastName: 'Adejana',
  tenon: 4,
  interest: 1000,
  paymentInstallation: 12000,
  totalPayment: 120000,
};

describe('Testing loan Controller', () => {
  describe('Testing loan request controller', () => {
    /**
       * Test the POST /auth/signup endpoint
       */
    const loanUrl = `${API_VERSION}/loans`;
    it('should create a new loan when all the parameters are given', (done) => {
      chai.request(app)
        .post(loanUrl)
        .send(testUser)

        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response).to.have.status(201);
          expect(response.body.status).to.equal(201);
          expect(response.body.data).to.be.a('object');
          expect(response.body.data).to.have.property('firstName');
          expect(response.body.data).to.have.property('lastName');
          expect(response.body.data).to.have.property('email');
          expect(response.body.data).to.have.property('tenon');
          expect(response.body.data).to.have.property('interest');
          expect(response.body.data).to.have.property('paymentInstallation');

          done(error);
        });
    });
    it('should not create a new loan request when the email is missing', (done) => {
      chai.request(app)
        .post(loanUrl)
        .send({
          firstName: 'Adeogo',
          lastName: 'Adejana',
          tenon: 4,
          interest: 1000,
          paymentInstallation: 12000,
          totalPayment: 'totalPayment',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Email is required');
          done(error);
        });
    });

    it('should not create a new loan request  when the first name is missing', (done) => {
      chai.request(app)
        .post(loanUrl)
        .send({
          lastName: 'Adeogo',
          email: 'test@test.com',
          tenon: 4,
          interest: 1000,
          totalPayment: 'totalPayment',
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
        .post(loanUrl)
        .send({
          firstName: 'Adeogo',
          email: 'test@test.com',
          tenon: 4,
          interest: 1000,
          paymentInstallation: 12000,
          totalPayment: 'totalPayment',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Last name is required');
          done(error);
        });
    });
    it('should not create a new loan request  when the totalPayment is missing', (done) => {
      chai.request(app)
        .post(loanUrl)
        .send({
          firstName: 'Adeogo',
          lastName: 'Adejana',
          email: 'test@tester.com',
          tenon: 4,
          interest: 1000,
          paymentInstallation: 12000,
          totalPayment: '',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Total payment is required');
          done(error);
        });
    });
    it('should not create a new loan request  when the tenon is missing', (done) => {
      chai.request(app)
        .post(loanUrl)
        .send({
          firstName: 'Adeogo',
          lastName: 'Adejana',
          email: 'test@tester.com',
          tenon: '',
          interest: 1000,
          paymentInstallation: 12000,
          totalPayment: 'totalPayment',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Tenon is required');
          done(error);
        });
    });
    it('should not create a new loan request when the interest is missing', (done) => {
      chai.request(app)
        .post(loanUrl)
        .send({
          firstName: 'Adeogo',
          lastName: 'Adejana',
          email: 'test@tester.com',
          tenon: 1000,
          interest: '',
          paymentInstallation: 12000,
          totalPayment: 'totalPayment',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Interest is required');
          done(error);
        });
    });

    it('should not create a new loan request  when the payment installation is missing', (done) => {
      chai.request(app)
        .post(loanUrl)
        .send({
          firstName: 'Adeogo',
          lastName: 'Adejana',
          email: 'test@tester.com',
          tenon: 1000,
          interest: 4,
          paymentInstallation: '',
          totalPayment: 'totalPayment',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Payment installament is required');
          done(error);
        });
    });
  });
});
