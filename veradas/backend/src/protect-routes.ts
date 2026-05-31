import { expressjwt } from 'express-jwt';
import { JWT_SECRET } from './routes/auth';

export const checkUser = expressjwt({
  secret: JWT_SECRET,
  algorithms: ['HS256']
});

export const handleAuthorizationError = (err: any, req: any, res: any, next: any) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'A művelet elvégzéséhez bejelentkezés szükséges' });
  } else {
    next(err);
  }
};