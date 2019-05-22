import moment from 'moment';
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

  static createUser(data) {
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
      firstName,
      lastName,
      homeAddress,
      workAddress,
      phoneNumber,
      email,
      password,
    } = data;
    const hashedPassword = help.hashPassword(password);
    const registered = moment().format();
    const status = 'unverified';
    const isAdmin = false;

    const values = [
      firstName,
      lastName,
      homeAddress,
      workAddress,
      phoneNumber,
      email,
      hashedPassword,
      registered,
      status,
      isAdmin,
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
    const result = db.query(query, [email]);

    return result;
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
}

export default User;
