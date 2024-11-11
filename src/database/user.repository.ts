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

  getUserById(id: string): User | undefined {
    return this.users.get(id);
  }

  getAllUsers(): User[] {
    return Array.from(this.users.values());
  }

  updateUser(id: string, updatedData: Partial<User>): User | undefined {
    const existingUser = this.users.get(id);
    if (!existingUser) return undefined;

    const updatedUser = {
      ...existingUser,
      ...updatedData,
      version: existingUser.version + 1,
      updatedAt: Date.now(),
    };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  deleteUser(id: string): boolean {
    return this.users.delete(id);
  }
}
