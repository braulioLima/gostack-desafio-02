import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

/**
 * Middleware responsible to verify if user have a token
 */
export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader;

  try {
    const { id } = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = id;

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token not provided' });
  }
};
