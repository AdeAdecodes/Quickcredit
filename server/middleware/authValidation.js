/* eslint-disable indent */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import statusCodes from '../helpers/statuscodes';

dotenv.config();

const { SECRET } = process.env;

// eslint-disable-next-line consistent-return
const authentication = (request, response, next) => {
  try {
    const header = request.headers.authorization;
    if (!header || header === '') return response.status(401).json({ status: statusCodes.unAuthorized, error: 'Authentication failed' });

    const token = jwt.verify(header, SECRET);
    request.decode = token;
    next();
  } catch (e) {
    return response.status(401).json({ status: statusCodes.unAuthorized, error: 'Invalid token!' });
  }
};

  // eslint-disable-next-line consistent-return
  const adminRole = (request, response, next) => {
      if (!request.decode.isAdmin === true) {
        return response.status(401).json({
          status: statusCodes.unAuthorized,
          error: 'isAdmin is required',
        });
      }
      next();
    };
export default { authentication, adminRole };
