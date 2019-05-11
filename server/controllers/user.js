import moment from 'moment';
import help from '../helpers/help';
import data from '../model/usersData';
import statusCodes from '../helpers/statuscodes';

/**
 * @class UserController
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

  // eslint-disable-next-line consistent-return
  static signup(request, response) {
    const {
      firstName, lastName, email, password, address
    } = request.body;

    if (help.searchByEmail(email, data.users)) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Email already exists',
      });
    }
    const userData = {
      id: help.getNextId(data.users),
      email,
      firstName,
      lastName,
      address,
      password: help.hashPassword(password),
      type: 'client',
      registered: moment().format(),
      isAdmin: false,
    };
    // store data into database
    data.users.push(userData);
    const token = help.jwtToken(userData);
    response.status(201).json({
      status: statusCodes.created,
      data: {
        token,
        id: userData.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        address: userData.address,
        registered: userData.registered,
      },
      message: 'User addded succesfully'
    });
  }

  static signin(request, response) {
    const {
      email, password
    } = request.body;

    const userData = {
      email,
      password
    };

    const storedUser = help.searchByEmail(email, data.users);
    if (storedUser) {
      if (help.validatePassword(userData.password, storedUser.password)) {
        const token = help.jwtToken(storedUser);
        return response.status(200).json({
          status: statusCodes.success,
          data: {
            token,
            id: storedUser.id,
            firstName: storedUser.firstName,
            lastName: storedUser.lastName,
            email: storedUser.email,
            message: 'Login successful'
          },
        });
      }
    }
    return response.status(401).json({
      status: statusCodes.unAuthorized,
      error: 'Invalid login details, email or password is wrong',
    });
  }
}


export default UserController;
