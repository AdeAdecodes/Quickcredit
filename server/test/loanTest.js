import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../app';

chai.use(chaiHttp);
const API_VERSION = '/api/v1';
const testUser = {
  tenor: 4,
  amount: 1000,
};

describe('Testing loan Controller', () => {
  describe('Testing loan request controller', () => {
    /**
       * Test the POST /auth/signup endpoint
       */
    const loanUrl = `${API_VERSION}/loans`;
    it('should not create a new loan request when the tenor is missing', (done) => {
      chai.request(app)
        .post(loanUrl)
        .send({
          tenor: '',
          amount: 1500,
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(401);
          expect(response.body.error).to.be.a('string');
          done(error);
        });
    });
    it('should not create a new loan request when the amount is missing', (done) => {
      chai.request(app)
        .post(loanUrl)
        .send({
          tenor: 1000,
          amount: '',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(401);
          expect(response.body.error).to.be.a('string');
          done(error);
        });
    });
  });
});
