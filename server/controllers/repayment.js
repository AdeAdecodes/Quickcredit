import dotenv from 'dotenv';
import paymentData from '../model/repaymentdata';
import loanData from '../model/loanData';
import statusCodes from '../helpers/statuscodes';

dotenv.config();

/**
 * @class RepaymentController
 *
 * @description Specifies which method handles a given request for a specific endpoint
 *
 * @exports RepaymentController
 */

class RepaymentController {
  static async payment(request, response) {
    try {
      const { amount } = request.body;
      const { email } = request.decode;
      const result = await loanData.searchByEmail(email);
      const loanId = result.rows[0].id;
      const data = { loanId, amount };
      
      if (result.rowCount < 1) {
        return response.status(400).json({
          status: statusCodes.badRequest,
          error: 'No pending loan',
        });
      }

      const payment = await paymentData.createPayment(data);
      const { id, createdon, status } = payment.rows[0];

      response.status(201).json({
        status: 201,
        data: {
          id,
          createdon,
          loanId,
          amount,
          status,
        },
      });
    } catch (e) {
      return response.status(401).json({ status: statusCodes.unAuthorized, error: 'unauthorized access!' });
    }
  }
}
export default RepaymentController;
