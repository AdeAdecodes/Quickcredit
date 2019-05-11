import moment from 'moment';
import utils from '../helpers/help';
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

    if (utils.searchByEmail(email, data.users)) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Email already exists',
      });
    }
    const userData = {
      id: utils.getNextId(data.users),
      email,
      firstName,
      lastName,
      address,
      password: utils.hashPassword(password),
      type: 'client',
      registered: moment().format(),
      isAdmin: false,
    };
    // store data into database
    data.users.push(userData);
    const token = utils.jwtToken(userData);
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
}

export default UserController;
