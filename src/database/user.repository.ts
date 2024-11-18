import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User } from '../users/interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<User[]> {
    return (await this.prisma.user.findMany()).map((user) => ({
      ...user,
      createdAt: Number(user.createdAt),
      updatedAt: Number(user.updatedAt),
    }));
  }

  async createUser(login: string, password: string): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        id: uuidv4(),
        login,
        password,
        version: 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    });

    return {
      ...user,
      createdAt: Number(user.createdAt),
      updatedAt: Number(user.updatedAt),
    };
  }

  async getUserById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (user === null) return null;
    return {
      ...user,
      createdAt: Number(user.createdAt),
      updatedAt: Number(user.updatedAt),
    };
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    const newUser = await this.prisma.user.update({
      where: { id },
      data: {
        ...data,
        version: (user.version || 0) + 1,
        updatedAt: Date.now(),
      },
    });

    return {
      ...newUser,
      createdAt: Number(newUser.createdAt),
      updatedAt: Number(newUser.updatedAt),
    };
  }

  async deleteUser(id: string): Promise<boolean> {
    const user = await this.prisma.user.delete({
      where: { id },
    });
    return !!user;
  }
}
