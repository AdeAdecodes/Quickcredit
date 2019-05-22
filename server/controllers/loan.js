import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userData from '../model/usersData';
import loanData from '../model/loanData';
import statusCodes from '../helpers/statuscodes';
import db from '../migration/database';


dotenv.config();

const { SECRET } = process.env;

/**
 * @class loanController
 */

class Loan {
  /**
   * User loan request
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} json
   */

  static async loanRequest(request, response) {
    const { amount, tenor } = request.body;
    const header = request.headers.authorization;
    const token = jwt.verify(header, SECRET);
    request.decode = token;
    const { email } = request.decode;
    const applicant = await userData.searchByEmail(email);
    const findUser = await loanData.searchByEmail(email);
    const data = { email, tenor, amount };


    if (findUser.rowCount > 0) {
      return response.status(409).json({
        status: statusCodes.conflict,
        error: 'Pending Loan Request',
      });
    }

    const loan = await loanData.createLoan(data);
    const { firstname, lastname } = applicant.rows[0];
    const { id, paymentinstallment, status, balance, interest } = loan.rows[0];

    response.status(201).json({
      status: 201,
      data: {
        id,
        firstname,
        lastname,
        email,
        tenor,
        amount,
        paymentinstallment,
        status,
        balance,
        interest,
      },
    });
  }


  /**
   * get a loans
   * @description get a all loan applications in the database
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} json
   * @memberof Loan
   */
  static async getLoans(req, res) {
    const { status, repaid } = req.query;

    if ((typeof status === 'undefined') && (typeof repaid === 'undefined')) {
      const { rows } = await db.query('SELECT * FROM loans');
      res.status(200).json({
        status: 200,
        data: rows,
      });
    } else {
      const text = 'SELECT * FROM loans WHERE status=$1 AND repaid=$2';
      const { rows } = await db.query(text, [status, repaid]);

      res.status(200).json({
        status: 200,
        data: rows,
      });
    }
  }

  /**
   * get a loan
   * @description get a specific loan applications in the database
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} json
   * @memberof Loan
   */

  static async getLoan(request, response) {
    const { loanId } = request.params;// query loanId in db.
    const loan = await loanData.getSpecificLoan(loanId);

    response.status(200).json({
      status: 200,
      data: loan,
    });
  }
  
  static getPaymentById(request, response) {
    const { id } = request.params;
    const userId = Number(id);
    const paymentDb = data.payment;

    const foundId = paymentDb.filter(paid => (paid.loanId === userId) && (paid.status === 'approved'));

    if (!foundId) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'No payment made',

      });
    }
    return response.status(200).json({
      status: statusCodes.success,
      data: foundId,
    });
  }
}
export default Loan;
