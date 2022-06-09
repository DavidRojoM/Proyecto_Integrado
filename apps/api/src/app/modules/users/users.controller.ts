import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from '@proyecto-integrado/shared';
import { AuthInterceptor } from '../auth/interceptors/auth.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { LoggingInterceptor } from '../../shared/interceptors/logging.interceptor';
import { Multer } from 'multer';

@UseInterceptors(LoggingInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<UserDto[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserDto> {
    return this.usersService.findOne(id);
  }

  @UseInterceptors(
    FileInterceptor('image', {
      limits: {
        fileSize: 1000000,
      },
    })
  )
  @Post()
  async signup(
    @UploadedFile() image: Express.Multer.File,
    @Body()
    user: UserDto
  ): Promise<Partial<UserDto>> {
    console.log(user);
    return this.usersService.signup(user, image);
  }

  @UseInterceptors(AuthInterceptor)
  @Put()
  update(@Body() updatedUser: UserDto): Promise<Partial<UserDto>> {
    return this.usersService.update(updatedUser);
  }
}
