// src/users/users.service.ts

import { Inject, Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UserRepository } from '../database/user.repository';

@Injectable()
export class UsersService {
  constructor(
    // @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  getAllUsers(): User[] {
    return this.userRepository.getAllUsers();
  }

  createUser(login: string, password: string): User {
    return this.userRepository.createUser(login, password);
  }

  getUserById(id: string): User | undefined {
    return this.userRepository.getUserById(id);
  }

  updateUser(id: string, updatedData: Partial<User>): User | undefined {
    return this.userRepository.updateUser(id, updatedData);
  }

  deleteUser(id: string): boolean {
    return this.userRepository.deleteUser(id);
  }
}
