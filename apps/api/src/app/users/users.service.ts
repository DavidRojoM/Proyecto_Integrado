import { Inject, Injectable } from '@nestjs/common';
import { PayloadActions, UserDto } from '@proyecto-integrado/shared';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersProxy: ClientProxy
  ) {}

  findAll() {
    return firstValueFrom(
      this.usersProxy.send(PayloadActions.USERS.FIND_ALL, {})
    );
  }

  findOne(id: string): Promise<UserDto> {
    return firstValueFrom(
      this.usersProxy.send<UserDto, { id: string }>(
        PayloadActions.USERS.FIND_BY_ID,
        { id }
      )
    );
  }

  signup(user: UserDto): Promise<Partial<UserDto>> {
    return firstValueFrom(
      this.usersProxy.send<UserDto, UserDto>(PayloadActions.USERS.CREATE, user)
    );
  }

  update(updatedUser: UserDto) {
    return firstValueFrom(
      this.usersProxy.send(PayloadActions.USERS.UPDATE, updatedUser)
    );
  }
}
