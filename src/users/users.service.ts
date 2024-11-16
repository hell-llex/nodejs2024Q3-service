// src/users/users.service.ts

import { Inject, Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UserRepository } from '../database/user.repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.getAllUsers();
  }

  async createUser(login: string, password: string): Promise<User> {
    return await this.userRepository.createUser(login, password);
  }

  async getUserById(id: string): Promise<User | undefined> {
    return await this.userRepository.getUserById(id);
  }

  async updateUser(
    id: string,
    updatedData: Partial<User>,
  ): Promise<User | undefined> {
    return await this.userRepository.updateUser(id, updatedData);
  }

  async deleteUser(id: string): Promise<boolean> {
    return await this.userRepository.deleteUser(id);
  }
}
