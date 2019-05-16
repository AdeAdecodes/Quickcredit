import help from '../helpers/help';
import data from '../model/usersData';
import statusCodes from '../helpers/statuscodes';

/**
 * @class AdminController
 */
class AdminController {
  /**
  * changes user account status
  * @param {object} request express request object
  * @param {object} response express response object
  *
  * @returns {json} json
  * @memberof userController
  */

  // eslint-disable-next-line consistent-return
  static verify(request, response) {
    const { status } = request.body;
    const { email } = request.params;
    const foundEmail = help.searchByEmail(email, data.users);
    if (!foundEmail) {
      return response.status(404).json({
        status: statusCodes.notFound,
        error: 'Email does not exists',
      });
    }
    foundEmail.status = status;

    response.status(200).json({
      status: statusCodes.success,
      data: {
        email,
        status,
      },
    });
  }
  /**

     * @method getAllUsers

     * @description List all users in the database

     * @param {object} request - The Request Object

     * @param {object} response - The Response Object

     * @returns {object} JSON API Response

     */
  // eslint-disable-next-line lines-between-class-members
  static getAllUsers(request, response) {
    const userData = data.users;

    if (userData.length < 0) {
      return response.status(404).json({
        status: statusCodes.notFound,
        error: 'No loan Application',
      });
    }
    return response.status(200).json({
      status: statusCodes.success,
      data: userData
    });
  }
}

export default AdminController;
