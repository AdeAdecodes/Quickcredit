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

  static async rejectLoan(loan) {
    const text = 'UPDATE loans SET status=$1 WHERE id=$2 RETURNING *;';
    const { rows } = await db.query(text, ['rejected', loan.id]);
    const data = {
      loanId: rows[0].id,
      loanAmount: rows[0].amount,
      tenor: rows[0].tenor,
      status: rows[0].status,
      monthlyInstallment: rows[0].paymentinstallment,
      interest: rows[0].interest,
    };
    return data;
  }

  static async acceptLoan(loan) {
    const text = 'UPDATE loans SET status=$1 WHERE id=$2 RETURNING *;';
    const { rows } = await db.query(text, ['approved', loan.id]);
    const data = {
      loanId: rows[0].id,
      loanAmount: rows[0].amount,
      tenor: rows[0].tenor,
      status: rows[0].status,
      monthlyInstallment: rows[0].paymentinstallment,
      interest: rows[0].interest,
    };
    return data;
  }
}
export default Loan;
