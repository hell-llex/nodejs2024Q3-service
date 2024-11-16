import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User } from '../users/interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async createUser(login: string, password: string): Promise<User> {
    return this.prisma.user.create({
      data: {
        id: uuidv4(),
        login,
        password,
        version: 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    });
  }

  async getUserById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    return this.prisma.user.update({
      where: { id },
      data: {
        ...data,
        version: (user.version || 0) + 1,
        updatedAt: Date.now(),
      },
    });
  }

  async deleteUser(id: string): Promise<boolean> {
    const user = await this.prisma.user.delete({
      where: { id },
    });
    return !!user;
  }
}
