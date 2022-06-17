import { Controller } from '@nestjs/common';
import {
  AddUserResponse,
  ChangeBalancesDto,
  ChangeBalancesResponse,
  FindUserByIdPayload,
  FindUserByUsernamePayload,
  FindUserResponse,
  PayloadActions,
  UserDto,
} from '@proyecto-integrado/shared';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(PayloadActions.USERS.CREATE)
  addOne(@Payload() user: UserDto): Promise<AddUserResponse> {
    return this.usersService.addOne(user);
  }

  @MessagePattern(PayloadActions.USERS.FIND_BY_ID)
  findOneById(
    @Payload() { id }: FindUserByIdPayload
  ): Promise<FindUserResponse> {
    return this.usersService.findOneById(id);
  }

  @MessagePattern(PayloadActions.USERS.FIND_BY_USERNAME)
  async findOneByUsername(
    @Payload() { username }: FindUserByUsernamePayload
  ): Promise<FindUserResponse> {
    return this.usersService.findOneByUsername(username);
  }

  @MessagePattern(PayloadActions.USERS.UPDATE_BALANCES)
  async updateBalances(
    config: ChangeBalancesDto
  ): Promise<ChangeBalancesResponse> {
    return this.usersService.updateBalances(config);
  }
}
