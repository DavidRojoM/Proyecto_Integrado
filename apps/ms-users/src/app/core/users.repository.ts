import { Injectable } from '@nestjs/common';
import { User } from '@proyecto-integrado/shared';
import * as bcrypt from 'bcrypt';

//TODO: MAP ENTITIES TO BUSINESS MODELS
@Injectable()
export class UsersRepository {
  data: User[] = [
    {
      id: '1',
      email: 'email',
      password: 'password',
      roles: 'roles',
      username: 'username',
    },
  ];

  async addOne(user: User): Promise<User> {
    const salt = await bcrypt.genSalt();
    const pass = await bcrypt.hash(user.password, salt);
    const newUser = {
      ...user,
      password: pass,
    };
    this.data = [...this.data, newUser];
    console.log(this.data);
    return user;
  }

  async findOneByUsername(username: string): Promise<User> {
    return this.data.find((user) => user.username === username);
  }
}
