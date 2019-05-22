import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userData from '../model/usersData';
import loanData from '../model/loanData';
import statusCodes from '../helpers/statuscodes';


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
   * Pay for loan
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} json
   * @memberof Loan
   */

  // eslint-disable-next-line consistent-return
  static payLoan(request, response) {
    const { amount } = request.body;
    const { id } = request.params;
    const userId = Number(id, 0);
    const amountPaid = Number(amount);
    const foundId = help.searchById(userId, data.loans);

    if (!foundId) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'User does not exists',
      });
    }

    const loanData = {
      id: help.getNextId(data.payment),
      createdOn: moment().format(),
      loanId: id,
      email: foundId.email,
      recentPayment: amountPaid,
      monthlypayment: foundId.paymentInstallation,
      status: 'Unapproved'
    };
    data.payment.push(loanData);

    response.status(200).json({
      status: statusCodes.success,
      data: {
        id: loanData.id,
        createdOn: loanData.createdOn,
        loanId: loanData.loanId,
        email: loanData.email,
        amountPaid: loanData.recentPayment,
        status: loanData.status,
      },
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
