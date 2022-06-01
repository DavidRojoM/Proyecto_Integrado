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

  //TODO: Add Typing
  async signup(user: any, image?: any): Promise<Partial<UserDto>> {
    const newUser = await this.plainToUserDto(user);
    newUser.image = await this.uploadUserImage(
      !image
        ? undefined
        : {
            userId: newUser.id,
            buffer: image?.buffer,
            size: image?.size,
            mimeType: image?.mimetype,
          }
    );
    const userAdded = await this.createUser(newUser);
    this.mailerProxy.emit(PayloadActions.MAIL.SEND_SIGNUP_WELCOME, userAdded);
    return userAdded;
  }

  update(updatedUser: UserDto) {
    return firstValueFrom(
      this.usersProxy.send(PayloadActions.USERS.UPDATE, updatedUser)
    );
  }

  private async createUser(user: UserDto): Promise<UserDto> {
    const response = await firstValueFrom(
      this.usersProxy.send<AddUserResponse, UserDto>(
        PayloadActions.USERS.CREATE,
        user
      )
    );

    if (response.ok === false) {
      //TODO: send image deletion event
      throw new BadRequestException({
        statusText: response.error.statusText,
        statusCode: response.error.statusCode,
      });
    }

    return response.value;
  }

  private async plainToUserDto(user: any): Promise<UserDto> {
    //TODO: Fix parsing
    const newUser = Object.assign(new UserDto(), {
      ...user,
      banned:
        typeof user.banned === 'string' ? JSON.parse(user.banned) : user.banned,
      parties: user.parties
        ? typeof user.parties === 'string'
          ? JSON.parse(user.parties)
          : user.parties
        : [],
      messages: user.messages
        ? typeof user.messages === 'string'
          ? JSON.parse(user.messages)
          : user.messages
        : [],
    });
    const validationErrors = await validate(newUser);
    if (validationErrors.length) {
      const validationsToString = validationErrors
        .map((e) => Object.values(e.constraints).join(', '))
        .join(', ');
      throw new Error(validationsToString);
    }
    return newUser;
  }

  private async uploadUserImage(image: ImageInput): Promise<string> {
    if (!image) {
      return 'http://localhost:3001/public/test.jpg';
    }
    let uploadResponse;

    try {
      uploadResponse = await firstValueFrom(
        this.imagesProxy.send<ImageUploadResponse, ImageInput>(
          PayloadActions.IMAGES.CREATE,
          image
        )
      );
    } catch (e) {
      throw new BadRequestException({
        statusCode: e.statusCode,
        statusText: e.message,
      });
    }

    if (uploadResponse.ok === false) {
      throw new BadRequestException({
        statusText: uploadResponse.error.statusText,
        statusCode: uploadResponse.error.statusCode,
      });
    }

    return uploadResponse.value.url;
  }
}
