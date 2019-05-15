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
      firstName, lastName, email, password, homeAddress, workAddress, phoneNumber
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
      homeAddress,
      workAddress,
      phoneNumber,
      password: help.hashPassword(password),
      registered: moment().format(),
      status: 'unverified',
      isAdmin: false,
    };
    // store data into database
    data.users.push(userData);
    const token = help.jwtToken({ email: userData.email, isAdmin: userData.isAdmin });
    response.status(201).json({
      status: statusCodes.created,
      data: {
        token,
        id: userData.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        homeAddress: userData.homeAddress,
        workAddress: userData.workAddress,
        phoneNumber: userData.phoneNumber,
        passsword: userData.password,
        registered: userData.registered,
        status: userData.status
      },
      message: 'User addded succesfully'
    });
  }
}
export default UserController;
