import db from '../migration/database';

/**

 * @exports Loan

 * @class Loan

 */

class Repayment {
  /**

   * @param {*} data

   * @returns { object } loan object

   */

  static createPayment(data) {
    const queryText = `INSERT INTO repayments (
    loanId,
    amount
    ) VALUES ($1,$2) RETURNING *;`;
    const { loanId, amount } = data;
    const amountFloat = parseFloat(amount);
    const values = [ loanId, amountFloat, ];
    const result = db.query(queryText, values);

    return result;
  }

  static searchById(id) {
    const query = 'SELECT * FROM repayments WHERE id=$1';

    const response = db.query(query, [id]);

    return response;
  }
}
export default Repayment;