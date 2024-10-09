import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express'; // Import Request from express

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest(); // Use Request from express
    if (data) {
      return request.user?.[data]; // Use optional chaining for safer access
    }
    return request.user;
  },
);
