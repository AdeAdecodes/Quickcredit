import statusCodes from '../helpers/statuscodes';

/**
 * @class loanValidate
 */

class loanValidate {
  static validateLoanRequest(request, response, next) {
    const { tenor, amount } = request.body;

    if (amount === undefined || amount === '' || amount === null) {
      return response.status(404).json({
        status: statusCodes.badRequest,
        error: 'Amout is not found',
      });
    }

    if (tenor === undefined || tenor === '' || tenor === null) {
      return response.status(404).json({
        status: statusCodes.badRequest,
        error: 'Tenor is not found',
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

  static payment(request, response, next) {
    const { amount } = request.body;
    if (amount === undefined || amount === '' || amount === null) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'amount is required',
      });
    }
    next();
  }
}
export default loanValidate;
