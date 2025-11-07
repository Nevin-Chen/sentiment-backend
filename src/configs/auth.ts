export const authConfig = {
  isProd: process.env.NODE_ENV === 'production',
  jwtSecret: process.env.JWT_SECRET!,
  jwtExpiresIn: 24 * 60 * 60,
  cookieMaxAge: 24 * 60 * 60,

  getCookieOptions() {
    return {
      httpOnly: true,
      secure: this.isProd,
      sameSite: this.isProd ? 'None' : 'Lax',
      maxAge: this.cookieMaxAge,
      path: '/',
    };
  },
};
