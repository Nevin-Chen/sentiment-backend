import { Controller, Get, Post, Body, Route, Security, Request, Res, TsoaResponse } from "tsoa";
import AuthService, { AuthPayload } from "../services/authService";

@Route("auth")
export class AuthController extends Controller {
  @Get("me")
  @Security("jwt")
  public async me(@Request() request: any): Promise<AuthPayload | null> {
    const token = request.cookies?.token;
    if (!token) return null;

    try {
      const user = AuthService.verifyToken(token);
      return user;
    } catch (err) {
      this.setStatus(401);
      throw new Error("Invalid or expired token");
    }
  }

  @Post("logout")
  @Security("jwt")
  public async logout(@Res() res: TsoaResponse<200, any>) {
    this.setHeader(
      "Set-Cookie",
      "token=; Max-Age=0; HttpOnly; Path=/; SameSite=Lax"
    );
    this.setStatus(200);
    return { message: "Logged out" };
  }

  @Post("guest")
  public continueAsGuest(@Res() res: TsoaResponse<200, AuthPayload>): void {
    const payload = AuthService.createGuestPayload();
    const token = AuthService.generateToken(payload);

    res(200, payload, {
      "Set-Cookie": AuthService.getCookieHeader(token),
    });
  }

  @Post("login")
  public async auth0Login(@Body() body: { idToken: string }) {
    if (!body.idToken) throw new Error("Invalid or missing Auth0 token")

    const decodedToken = await AuthService.verifyAuth0Token(body.idToken);
    const payload = AuthService.createUserPayload(decodedToken.payload.sub, decodedToken.payload.email, decodedToken.payload.name);
    const jwt = AuthService.generateToken(payload);

    this.setHeader("Set-Cookie", AuthService.getCookieHeader(jwt));
  }
}
