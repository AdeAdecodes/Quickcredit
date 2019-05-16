
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
}

export default loan;
