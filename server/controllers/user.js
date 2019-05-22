import help from '../helpers/help';
import data from '../model/usersData';
import statusCodes from '../helpers/statuscodes';

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
    const user = result.rows[0];
    const token = help.jwtToken(user);

    return response.status(201).json({
      status: response.statusCode,
      data: {
        token,
        user,
      },
      message: `Registration Successful ${user.firstname}`
    });
  }

  static signin(request, response) {
    const {
      email, password
    } = request.body;

    const users = help.searchByEmail(email, data.users);
    if (!users) {
      return response
        .status(401)
        .json({ status: 401, error: 'Sorry, the email/password you provided is incorrect' });
    }
    const verifyPassword = help.validatePassword(password, users.password);
    if (!verifyPassword) {
      return response
        .status(401)
        .json({ status: 401, error: 'Sorry, the email/password you provided is incorrect' });
    }
    const token = help.jwtToken(users);
    return response.status(200).json({
      status: statusCodes.success,
      data: {
        token,
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
        message: 'Login successful',
      }
    });
  }
}
export default UserController;
