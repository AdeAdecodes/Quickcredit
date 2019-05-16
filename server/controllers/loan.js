
import moment from 'moment';
import help from '../helpers/help';
import data from '../model/usersData';
import statusCodes from '../helpers/statuscodes';

/**
 * @class loanController
 */
class loan {
  /**
   * User loan request
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} json
   */
  // eslint-disable-next-line consistent-return
  static loanrequest(request, response) {
    const {
      firstName, lastName, tenon, email, interest, paymentInstallation, totalPayment
    } = request.body;

    if (help.searchByEmail(email, data.loans)) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Pending Loan Request',
      });
    }
    const loanData = {
      id: help.getNextId(data.loans),
      firstName,
      lastName,
      email,
      tenon,
      interest,
      paymentInstallation,
      totalPayment,
      requestDate: moment().format(),
      status: 'pending',
      loanRepaid: false
    };
    data.loans.push(loanData);

    return response.status(201).json({
      status: statusCodes.created,
      data: {
        loanId: loanData.id,
        firstName: loanData.firstName,
        lastName: loanData.lastName,
        email: loanData.email,
        tenon: loanData.tenon,
        paymentInstallation: loanData.paymentInstallation,
        interest: loanData.interest,
        totalPayment: loanData.totalPayment,
        balance: loanData.totalPayment,
        requestDate: loanData.requestDate,
        status: loanData.status,
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
        amountPaid: loanData.recentPayment,
        status: loanData.status,
      },
    });
  }

}

export default loan;
