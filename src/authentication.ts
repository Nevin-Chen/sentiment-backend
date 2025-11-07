import AuthService from "./services/authService";

export function expressAuthentication(
  request: any,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  if (securityName === "jwt") {
    return new Promise((resolve, reject) => {
      const token = request.cookies?.token;

      if (!token) {
        const err = new Error("No JSON Web Token provided") as any;
        err.status = 401;
        return reject(err);
      }

      try {
        const payload = AuthService.verifyToken(token);
        request.user = payload;
        resolve(payload);
      } catch (err) {
        const authErr = new Error("Invalid or expired token") as any;
        authErr.status = 401;
        reject(authErr);
      }
    });
  }

  return Promise.reject(new Error("Invalid security name"));
}
