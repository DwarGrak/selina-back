import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export interface User {
  id: number;
  username: string;
  password: string;
}

@Injectable()
export class UsersService {
  private readonly user: User = {
    id: 123456,
    username: 'usrname',
    password: 'pwd',
  };

  async findOne(username: string): Promise<User> {
    return username === this.user.username ? { ...this.user } : null;
  }
}
