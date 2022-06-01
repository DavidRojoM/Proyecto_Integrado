import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
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

  //TODO: Add @File to upload images on signup
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async signup(
    @UploadedFile() image: Express.Multer.File,
    @Body()
    user: any
  ): Promise<Partial<UserDto>> {
    //TODO: Add formdata validation (test front first)
    return this.usersService.signup(user, image);
  }

  @UseInterceptors(AuthInterceptor)
  @Put()
  update(@Body() updatedUser: UserDto): Promise<Partial<UserDto>> {
    return this.usersService.update(updatedUser);
  }
}
