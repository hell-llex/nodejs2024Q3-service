// src/database/user.repository.ts

import { Injectable } from '@nestjs/common';
import { User } from '../users/interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserRepository {
  private users: Map<string, User> = new Map();

  createUser(login: string, password: string): User {
    const newUser: User = {
      id: uuidv4(),
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.set(newUser.id, newUser);
    return newUser;
  }

  findUserById(userId: string): User | undefined {
    return this.users.get(userId);
  }

  getAllUsers(): User[] {
    return Array.from(this.users.values());
  }

  updateUser(userId: string, updatedData: Partial<User>): User | undefined {
    const existingUser = this.users.get(userId);
    if (!existingUser) return undefined;

    const updatedUser = {
      ...existingUser,
      ...updatedData,
      version: existingUser.version + 1,
      updatedAt: Date.now(),
    };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  deleteUser(userId: string): boolean {
    return this.users.delete(userId);
  }
}
