/* eslint-disable indent */
import help from '../helpers/help';
import data from '../model/usersData';
import statusCodes from '../helpers/statuscodes';

/**
 * @class AdminController
 */
class AdminController {
  /**
  * changes user account status
  * @param {object} request express request object
  * @param {object} response express response object
  *
  * @returns {json} json
  * @memberof userController
  */

  // eslint-disable-next-line consistent-return
  static verify(request, response) {
    const { status } = request.body;
    const { email } = request.params;
    const foundEmail = help.searchByEmail(email, data.users);
    if (!foundEmail) {
      return response.status(404).json({
        status: statusCodes.notFound,
        error: 'Email does not exists',
      });
    }
    foundEmail.status = status;

    response.status(200).json({
      status: statusCodes.success,
      data: {
        email,
        status,
      },
    });
  }
  /*

     * @method getAllUsers

     * @description List all users in the database

     * @param {object} request - The Request Object

     * @param {object} response - The Response Object

     * @returns {object} JSON API Response

     */
  // eslint-disable-next-line lines-between-class-members
  static getAllUsers(request, response) {
    const userData = data.users;

    if (userData.length < 0) {
      return response.status(404).json({
        status: statusCodes.notFound,
        error: 'No loan Application',
      });
    }
    return response.status(200).json({
      status: statusCodes.success,
      data: userData
    });
  }

  /**

     * @method getAllLoans

     * @description List all loan applications in the database

     * @param {object} request - The Request Object

     * @param {object} response - The Response Object

     * @returns {object} JSON API Response

     */
  static getAllLoans(request, response) {
    const loanData = data.loans;
    // eslint-disable-next-line no-unused-vars
    const { status, repaid } = request.query;

    if (Object.keys(request.query).length === 0) { // check if query parimeter is empty
      return response.status(200).json({

        status: 200,

        data: loanData // return all loan

      });
    }

    const loanRepaid = JSON.parse(repaid);

    const sortLoan = loanData.filter(debt => debt.loanRepaid === loanRepaid);

    return response.status(200).json({

      status: 200,

      data: sortLoan
    });
  }

  /*
      * @method getLoansById

       * @description get a specific loan applications in the database

       * @param {object} request - The Request Object

       * @param {object} response - The Response Object

       * @returns {object} JSON API Response

       */
  // eslint-disable-next-line consistent-return
  static getLoansById(request, response) {
    const { id } = request.params;
    const userId = Number(id);

    const foundId = help.searchById(userId, data.loans);

    if (!foundId) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'No loan Application',
      });
    }

    return response.status(200).json({
      status: statusCodes.success,
      data: foundId,
    });
  }
  /**
     * changes loan status
     * @param {object} request express request object
     * @param {object} response express response object
     *
     * @returns {json} json
     * @memberof userController
     */

  // eslint-disable-next-line consistent-return
  static loanVerify(request, response) {
    const { status } = request.body;
    const { id } = request.params;
    const userId = Number(id);

    const foundId = help.searchById(userId, data.loans);
    if (!foundId) {
      return response.status(404).json({
        status: statusCodes.notFound,
        error: 'Id does not exists',
      });
    }

    foundId.status = status;
    response.status(200).json({
      status: statusCodes.success,
      data: foundId
    });
  }
   /**
     * changes loan status
     * @param {object} request express request object
     * @param {object} response express response object
     *
     * @returns {json} json
     * @memberof userController
     */

  // eslint-disable-next-line consistent-return
  static paymentVerify(request, response) {
    const { status } = request.body;
    const { id } = request.params;
    const { loanId } = request.params;
    const userId = Number(id);
    const foundId = help.searchById(userId, data.payment);
    const loanDb = help.searchById(Number(loanId), data.loans);

    if (!foundId) {
      return response.status(404).json({
        status: statusCodes.notFound,
        error: 'Id does not exists',
      });
    }
    if (loanDb.status !== 'approved') {
      return response.status(404).json({
        status: statusCodes.notFound,
        error: 'Id does not exists',
      });
    }
    if (status === 'declined') {
      return response.status(404).json({
        // eslint-disable-next-line no-trailing-spaces
        status: statusCodes.notFound, 
        error: 'Payment was declined',
      });
    // eslint-disable-next-line no-else-return
    } else if (status === 'approved') {
      // eslint-disable-next-line no-unused-expressions
      foundId.status = status;
      loanDb.balance -= foundId.recentPayment;
      loanDb.repaidLoans += foundId.recentPayment;
      loanDb.loanRepaid = (loanDb.repaidLoans === loanDb.totalPayment);
      response.status(200).json({
        status: statusCodes.success,
        data: {
          foundId,
          loanDb
        }
      });
    }
  }
    /**

     * @method getAllPayment

     * @description List all loan applications in the database

     * @param {object} request - The Request Object

     * @param {object} response - The Response Object

     * @returns {object} JSON API Response

     */

    static getAllPayment(request, response) {
      const paymentData = data.payment;
      if (paymentData.length < 0) {
        return response.status(404).json({
          status: statusCodes.notFound,
          error: 'No payment record',
        });
      }
      return response.status(200).json({
        status: statusCodes.success,
        data: paymentData,
      });
    }
  }

export default AdminController;
