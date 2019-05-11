import help from '../helpers/help';
import statusCodes from '../helpers/statuscodes';

/**
 * @class UserValidate
 */
class UserValidate {
  // eslint-disable-next-line consistent-return
  static validateSignup(request, response, next) {
    const {
      firstName, lastName, email, password, confirmPassword, address
    } = request.body;

    if (!firstName || firstName.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'First name is required',
      });
    }

    if (!lastName || lastName.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Last name is required',
      });
    }

    if (!email || email.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Email is required',
      });
    }
    if (!address || address.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Address is required',
      });
    }

    if (email) {
      const isValid = help.emailValidator(email);
      if (!isValid) {
        return response.status(400).json({
          status: statusCodes.badRequest,
          error: 'Invalid email address',
        });
      }

      if (!password || password.trim().length === 0) {
        return response.status(400).json({
          status: statusCodes.badRequest,
          error: 'Password is required',
        });
      }

      if (password !== confirmPassword) {
        return response.status(400).json({
          status: statusCodes.badRequest,
          error: 'Passwords do not match',
        });
      }
      next();
    }
  }

  // eslint-disable-next-line consistent-return
  static validateSignin(request, response, next) {
    const { email, password, } = request.body;
    if (!email || email.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Email is required',
      });
    }

    if (email) {
      const isValid = help.emailValidator(email);
      if (!isValid) {
        return response.status(400).json({
          status: statusCodes.badRequest,
          error: 'Invalid email address',
        });
      }
    }

    if (!password || password.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Password is required',
      });
    }
    next();
  }
}
export default UserValidate;
