import { createParamDecorator } from '@nestjs/common';
import { User } from '../../user/entity/user.entity';

export const InjectUser = createParamDecorator((data, req): User => {
  return req.user;
});
