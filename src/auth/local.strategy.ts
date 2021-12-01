import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
   constructor(private authService: AuthService) {
      super({ passReqToCallback: true });
   }

   async validate(req: Request, username: string, password: string): Promise<any> {
      return await this.authService.validateUser(username, password, req.headers['lang']);
   }
}