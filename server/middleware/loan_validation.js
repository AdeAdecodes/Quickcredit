import statusCodes from '../helpers/statuscodes';

/**
 * @class UserValidate
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
}
export default loanValidate;
