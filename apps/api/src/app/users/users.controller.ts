import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from '@proyecto-integrado/shared';

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
  signup(@Body() user: UserDto): Promise<Partial<UserDto>> {
    return this.usersService.signup(user);
  }

  @Put()
  update(@Body() updatedUser: UserDto): Promise<Partial<UserDto>> {
    return this.usersService.update(updatedUser);
  }
}
