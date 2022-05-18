import { Controller } from '@nestjs/common';
import {
  FindOneByUsername,
  PayloadActions,
  UserDto,
} from '@proyecto-integrado/shared';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(PayloadActions.USERS.CREATE)
  addOne(@Payload() user: UserDto): Promise<UserDto> {
    return this.usersService.addOne(user);
  }

  @MessagePattern(PayloadActions.USERS.FIND_BY_USERNAME)
  findOneByUsername(
    @Payload() { username }: FindOneByUsername
  ): Promise<UserDto> {
    return this.usersService.findOneByUsername(username);
  }
}
