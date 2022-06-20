import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  AddUserResponse,
  ChangeBalancesDto,
  ChangeBalancesResponse,
  DeleteUserResponse,
  FindUsersResponse,
  ImageInput,
  ImageUploadResponse,
  PayloadActions,
  UserDto,
} from '@proyecto-integrado/shared';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersProxy: ClientProxy,
    @Inject('MAILER_SERVICE') private readonly mailerProxy: ClientProxy,
    @Inject('IMAGES_SERVICE') private readonly imagesProxy: ClientProxy
  ) {}

  async findAll() {
    const findResult = await firstValueFrom(
      this.usersProxy.send<FindUsersResponse>(PayloadActions.USERS.FIND_ALL, {})
    );

    if (findResult.ok === false) {
      throw new BadRequestException({
        statusText: findResult.error.statusText,
        statusCode: findResult.error.statusCode,
      });
    }
    return findResult.value;
  }

  findOne(id: string): Promise<UserDto> {
    return firstValueFrom(
      this.usersProxy.send<UserDto, { id: string }>(
        PayloadActions.USERS.FIND_BY_ID,
        { id }
      )
    );
  }

  async signup(user: UserDto, image?: any): Promise<Partial<UserDto>> {
    user.image = await this.uploadUserImage(
      !image
        ? undefined
        : {
            userId: user.id,
            buffer: image?.buffer,
            size: image?.size,
            mimeType: image?.mimetype,
          }
    );
    const userAdded = await this.createUser(user);
    this.mailerProxy.emit(PayloadActions.MAIL.SEND_SIGNUP_WELCOME, userAdded);
    return userAdded;
  }

  async update(user: UserDto, image?: any): Promise<Partial<UserDto>> {
    if (image) {
      user.image = await this.uploadUserImage(
        !image
          ? undefined
          : {
              userId: user.id,
              buffer: image?.buffer,
              size: image?.size,
              mimeType: image?.mimetype,
            }
      );
    }
    return await this.updateUser(user);
  }

  async delete(id: string) {
    const deleteResponse = await firstValueFrom(
      this.usersProxy.send<DeleteUserResponse, { id: string }>(
        PayloadActions.USERS.DELETE,
        { id }
      )
    );

    if (deleteResponse.ok === false) {
      throw new BadRequestException({
        statusText: deleteResponse.error.statusText,
        statusCode: deleteResponse.error.statusCode,
      });
    }
    return deleteResponse.value;
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

  private async updateUser(user: UserDto) {
    const response = await firstValueFrom(
      this.usersProxy.send<AddUserResponse, UserDto>(
        PayloadActions.USERS.UPDATE,
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

  async increaseBalances(
    config: ChangeBalancesDto
  ): Promise<ChangeBalancesDto> {
    const response = await firstValueFrom(
      this.usersProxy.send<ChangeBalancesResponse, ChangeBalancesDto>(
        PayloadActions.USERS.UPDATE_BALANCES,
        config
      )
    );
    if (response.ok === false) {
      throw new BadRequestException({
        statusText: response.error.statusText,
        statusCode: response.error.statusCode,
      });
    }
    return response.value;
  }
}
