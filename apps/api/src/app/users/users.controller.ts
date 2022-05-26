import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from '@proyecto-integrado/shared';
import { AuthInterceptor } from '../auth/interceptors/auth.interceptor';

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
  @Post()
  signup(@Body(new ValidationPipe()) user: UserDto): Promise<Partial<UserDto>> {
    return this.usersService.signup(user);
  }

  @UseInterceptors(AuthInterceptor)
  @Put()
  update(
    @Body(new ValidationPipe()) updatedUser: UserDto
  ): Promise<Partial<UserDto>> {
    return this.usersService.update(updatedUser);
  }
}
