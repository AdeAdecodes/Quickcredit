import statusCodes from '../helpers/statuscodes';

/**
 * @class loanValidate
 */
class loanValidate {
  // eslint-disable-next-line consistent-return
  static validateLoanRequest(request, response, next) {
    const {
      firstName, lastName, email, tenon, interest, paymentInstallation, totalPayment,
    } = request.body;

    if (firstName === undefined || firstName === '' || firstName === null) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'First name is required',
      });
    } if (lastName === undefined || lastName === '' || lastName === null) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Last name is required',
      });
    } if (email === undefined || email === '' || email === null) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Email is required',
      });
    }
    if (tenon === undefined || tenon === '' || tenon === null) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Tenon is required',
      });
    }

    if (interest === undefined || interest === '' || interest === null) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Interest is required',
      });
    }

    if (paymentInstallation === undefined || paymentInstallation === '' || paymentInstallation === null) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Payment installament is required',
      });
    }
    if (totalPayment === undefined || totalPayment === '' || totalPayment === null) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Total payment is required',
      });
    }
    next();
  }

  static loanQuery(request, response, next) {
    /* check if query parimeter is empty  return all loan */

    const loanQueryParams = request.query;

    if (Object.keys(loanQueryParams).length === 0) {
      return next();
    }

    /**

     * get values from loan query parimenter

     */

    const loanStatus = loanQueryParams.status;

    let loanRepaid = loanQueryParams.repaid;

    if (loanRepaid === 'false') { loanRepaid = false; }

    if (loanRepaid === 'true') { loanRepaid = true; }

    /**

     * validate loan query parimeter if it has

     * object property of status and repaid else

     * throw an error message.

     */

    const errorMessage = {};

    if (!(loanRepaid === true || loanRepaid === false)) {
      errorMessage.repaid = 'repaid value is required & should be true or false';
    }

    if (!(loanStatus === 'approved' || loanStatus === 'pending' || loanStatus === 'rejected')) {
      errorMessage.status = 'status value is required & should be pending, approved, rejected';
    }

    if (!(Object.keys(errorMessage).length === 0)) {
      return response.status(422).json(errorMessage);
    }

    return next();
  }

  // eslint-disable-next-line consistent-return
  static loanStatusChange(request, response, next) {
    const { status } = request.body;
    if (!status || status.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'No status selected',
      });
    }

    if (status !== 'approved' && status !== 'declined') {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Wrong status selected',
      });
    }

    next();
  }
}
export default loanValidate;
