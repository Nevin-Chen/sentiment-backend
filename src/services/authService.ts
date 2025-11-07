import jwt from "jsonwebtoken";
import { authConfig } from '../configs/auth';
const { v4: uuidv4 } = require('uuid');

export interface AuthPayload {
  id: string;
  username: string;
  auth0Id?: string;
  email?: string;
}

class AuthService {
  private static isProd = process.env.NODE_ENV === 'production';

  static generateToken(payload: any): string {
    return jwt.sign(payload, authConfig.jwtSecret, {
      expiresIn: authConfig.jwtExpiresIn,
    });
  }

  static verifyToken(token: string): AuthPayload {
    return jwt.verify(token, authConfig.jwtSecret) as AuthPayload;
  }

  static verifyAuth0Token(token: string): any {
    return jwt.decode(token, { complete: true });
  }

  static createGuestPayload(): AuthPayload {
    const uuid = uuidv4();

    return {
      id: `guest_${uuid}`,
      username: `Guest_${uuid.slice(0, 8)}`,
    };
  }

  static createUserPayload(auth0Id: string, email: string, username: string): AuthPayload {
    return {
      id: `user_${uuidv4()}`,
      username: username || email.split("@")[0],
      auth0Id,
      email,
    };
  }

  static getCookieHeader(token: string) {
    const options = authConfig.getCookieOptions();
    const secure = options.secure ? ' Secure;' : '';
    return `token=${token}; HttpOnly;${secure} Max-Age=${options.maxAge}; SameSite=${options.sameSite}; Path=${options.path}`;
  }

  static clearCookieHeader() {
    const options = authConfig.getCookieOptions();
    const secure = options.secure ? ' Secure;' : '';
    return `token=; Max-Age=0; HttpOnly;${secure} Path=${options.path}; SameSite=${options.sameSite}`;
  }
}

export default AuthService;
