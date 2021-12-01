import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Language = createParamDecorator((data, context: ExecutionContext) => {
   const request = context.switchToHttp().getRequest();
   return request.headers['lang']
});