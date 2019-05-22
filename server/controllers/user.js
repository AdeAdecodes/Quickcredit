import help from '../helpers/help';
import data from '../model/usersData';
import statusCodes from '../helpers/statuscodes';
import db from '../migration/database';

/**
 * @class UserController
 *
 * @description Specifies which method handles a given request for a specific endpoint
 *
 * @exports UserController
 */

class UserController {
  /**
   * creates new user
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} json
   * @memberof UserController
   */

  static async signUp(request, response) {
    const foundUser = await data.searchByEmail(request.body.email);

    if (foundUser.rowCount > 0) {
      return response.status(409).json({
        status: statusCodes.badRequest,
        error: 'email is already taken',
      });
    }

    const result = await data.createUser(request.body);
    const { firstname, lastname, homeaddress, workaddress, 
         phonenumber, email, registered, status, isadmin,} = result.rows[0];
    const token = help.jwtToken({ email, isadmin });

    return response.status(201).json({
      status: response.statusCode,
      data: {
        token,
        firstname,
        lastname,
        homeaddress,
        workaddress,
        phonenumber,
        email,
        registered,
        status,
        isadmin,
      },
      message: `Registration Successful ${ firstname }`
    });
  }

  /**

  * @method signIn

  * @description Logs in a user

  * @param {object} req - The Request Object

  * @param {object} res - The Response Object

  * @returns {object} JSON API Response

  */

  static async signIn(request, response) {
    const { email, password } = request.body;
    const result = await data.searchByEmail(email);

    if (result.rowCount < 1 || !help.validatePassword(password, result.rows[0].password)) {
      return response.status(401).json({
        status: response.statusCode,
        error: 'Sorry, the email/password you provided is incorrect',
      });
    }

    const { id, firstname, lastname, isadmin } = result.rows[0];
    const token = help.jwtToken({ id, email, isadmin });

    return response.status(200).json({
      status: statusCodes.success,
      data: [{
        token,
        id,
        firstname,
        lastname,
        email,
      }],
      message: `Login successful ${firstname}`,
    });
  }

  static async verify(request, response) {
    const { email } = request.params;
    const text = 'UPDATE users SET status=$1 WHERE email=$2 RETURNING *;';
    const param = ['verified', email];
    const { rows } = await db.query(text, param);

    response.status(200).json({
      status: 200,
      data: {
        email,
        firstName: rows[0].firstname,
        lastName: rows[0].lastname,
        password: rows[0].password,
        homeAddress: rows[0].homeAddress,
        workAddress: rows[0].workAddress,
        status: rows[0].status,
      },
    });
  }
}
export default UserController;
