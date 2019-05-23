import dotenv from 'dotenv';
import paymentData from '../model/repaymentdata';
import loanData from '../model/loanData';
import statusCodes from '../helpers/statuscodes';
import db from '../migration/database';


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

  static async verify(request, response) {
    const { status } = request.body;
    const { loanId } = request.params;
    const { id } = request.params;
    const userPayment = await paymentData.searchById(Number(id));
    const loanDataId = Number(loanId);


    if (userPayment.rowCount < 1) {
      return response.status(404).json({
        status: statusCodes.notFound,
        error: 'payment does not exists',
      });
    }

    if (status === 'declined') {
      const text = 'UPDATE repayments SET status=$1 WHERE id=$2 RETURNING *;';
      const param = ['declined', id];
      const { rows } = await db.query(text, param);

      return response.status(200).json({
        status: statusCodes.success,
        data: {
          id,
          createdon: rows[0].createdon,
          loanId,
          amount: rows[0].amount,
          status: rows[0].status
        },
        message: 'Payment was declined',
      });
    }

    if (status === 'approved') {
      const text = 'UPDATE repayments SET status=$1 WHERE id=$2 RETURNING *;';
      const param = ['approved', id];
      const { rows } = await db.query(text, param);
      const specificLoan = await loanData.getSpecificLoan(loanDataId);
      const balance = specificLoan.balance - rows[0].amount;
      const text2 = 'UPDATE loans SET balance=$1 WHERE id=$2 RETURNING *;';
      const result = await db.query(text2, [balance, loanDataId]);

      if (result.rows[0].balance === 0) { // check if loan is fully paid.
        const text3 = 'UPDATE loans SET repaid=$1 WHERE id=$2';
        const loanrepaid = await db.query(text3, [true, specificLoan]);
      }

      response.status(200).json({
        status: 200,
        data: {
          id,
          createdon: rows[0].createdon,
          loanDataId,
          amount: rows[0].amount,
          status: rows[0].status
        },
        message: 'Payment was success',
      });
    }
  }
}
export default RepaymentController;
