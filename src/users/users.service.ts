// src/users/users.service.ts

import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UserRepository } from '../database/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  getAllUsers(): User[] {
    return this.userRepository.getAllUsers();
  }

  createUser(login: string, password: string): User {
    return this.userRepository.createUser(login, password);
  }

  findUserById(userId: string): User | undefined {
    return this.userRepository.findUserById(userId);
  }

  updateUser(userId: string, updatedData: Partial<User>): User | undefined {
    return this.userRepository.updateUser(userId, updatedData);
  }

  deleteUser(userId: string): boolean {
    return this.userRepository.deleteUser(userId);
  }
}
