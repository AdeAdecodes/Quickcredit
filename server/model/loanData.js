import db from '../migration/database';

/**

 * @exports Loan

 * @class Loan

 */

class Loan {
  /**

   * @param {*} data

   * @returns { object } loan object

   */

  static createLoan(data) {
    const queryText = `INSERT INTO loans(
    email,
    tenor,
    amount,
    paymentinstallment,
    balance,
    interest
    ) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;`;
    const { email, amount, tenor } = data;
    const amountFloat = parseFloat(amount);
    const values = [
      email,
      tenor,
      amount,
      (amountFloat + (0.05 * amountFloat)) / Number(tenor),
      (amountFloat + (0.05 * amountFloat)),
      (0.05 * amountFloat),
    ];
    const result = db.query(queryText, values);

    return result;
  }

  static searchByEmail(email) {
    const query = 'SELECT * FROM loans WHERE email=$1';
    const result = db.query(query, [email]);

    return result;
  }

  static async getSpecificLoan(loanId) {
    const text = 'SELECT * FROM loans WHERE id=$1;';
    const { rows } = await db.query(text, [loanId]);

    if (rows.length === 0) {
      return 'not found';
    }
    return rows[0];
  }
}
export default Loan;
