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
}

export default AdminController;
