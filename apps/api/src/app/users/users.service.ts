import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  AddUserResponse,
  ImageInput,
  ImageUploadResponse,
  PayloadActions,
  UserDto,
} from '@proyecto-integrado/shared';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { validate } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersProxy: ClientProxy,
    @Inject('MAILER_SERVICE') private readonly mailerProxy: ClientProxy,
    @Inject('IMAGES_SERVICE') private readonly imagesProxy: ClientProxy
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

  async signup(user: UserDto): Promise<Partial<UserDto>> {
    const result = await firstValueFrom(
      this.usersProxy.send<UserDto, UserDto>(PayloadActions.USERS.CREATE, user)
    );
    this.mailerProxy.emit(PayloadActions.MAIL.SEND_SIGNUP_WELCOME, result);
    return result;
  }

  update(updatedUser: UserDto) {
    return firstValueFrom(
      this.usersProxy.send(PayloadActions.USERS.UPDATE, updatedUser)
    );
  }
}
