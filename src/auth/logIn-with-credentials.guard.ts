import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LogInWithCredentialsGuard extends AuthGuard('local') {
   async canActivate(context: ExecutionContext): Promise<boolean> {
      // перевірити логін та пароль
      await super.canActivate(context);
      // ініціювати сесію
      const request = context.switchToHttp().getRequest();
      await super.logIn(request);

      return true;
   }
}