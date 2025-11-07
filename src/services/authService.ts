import jwt from "jsonwebtoken";
const { v4: uuidv4 } = require('uuid');

const jwtSecret = process.env.JWT_SECRET;
const jwtExpiresIn = "24h"
const cookieMaxAge = 24 * 60 * 60;

export interface AuthPayload {
  id: string;
  username: string;
  auth0Id?: string;
  email?: string;
}

class AuthService {
  static generateToken(payload: AuthPayload): string {
    if (!jwtSecret) throw new Error('JWT_SECRET is not set');

    return jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn });
  }

  static verifyToken(token: string): AuthPayload {
    if (!jwtSecret) throw new Error('JWT_SECRET is not set');

    return jwt.verify(token, jwtSecret) as AuthPayload;
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
    return `token=${token}; HttpOnly; Max-Age=${cookieMaxAge}; SameSite=Lax; Path=/; 'Secure;'}`;
  }
}

export default AuthService;
