import help from '../helpers/help';
import db from '../migration/database';


/**

 * @exports User

 * @class User

 */

class User {
  /**

   * @param {*} data

   * @returns { object } user object

   */

  static create(data) {
    const queryText = `INSERT INTO users (
      firstName,
      lastName,
      homeAddress,
      workAddress,
      phoneNumber,
      email,
      password,
      registered,
      status,
      isAdmin
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;


    const {
      // eslint-disable-next-line max-len
      firstName, lastName, homeAddress, workAddress, phoneNumber, email, password, registered, status, isAdmin
    } = data;

    const values = [
      // eslint-disable-next-line max-len
      firstName, lastName, homeAddress, workAddress, phoneNumber, email, password, registered, status, isAdmin
    ];

    const response = db.query(queryText, values);

    return response;
  }

  /**

   * @param {*} email

   * @returns { object } user object

   */

  static searchByEmail(email) {
    const query = 'SELECT * FROM users WHERE email=$1';

    const response = db.query(query, [email]);

    return response;
  }


  /**

   * @param {*} id

   * @returns { object } user object

   */

  static searchById(id) {
    const query = 'SELECT * FROM users WHERE id=$1';

    const response = db.query(query, [id]);

    return response;
  }


  /**

   * @param {*} password

   *  @param {*} id

   * @returns {object} user object

   */

  static updatePassword(password, id) {
    const query = 'UPDATE users SET password = $1 WHERE id = $2';

    const response = db.query(query, [help.hashPassword(password), id]);

    return response;
  }
}

export default User;
