// src/users/users.controller.ts

import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdatePasswordDto } from './interfaces/user.interface';
import { CreateUserDto, UserResponseDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllUsers(): UserResponseDto[] {
    return this.usersService
      .getAllUsers()
      .map((user) => new UserResponseDto(user));
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findUserById(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid UUID format for userId'),
      }),
    )
    userId: string,
  ): UserResponseDto {
    const user = this.usersService.findUserById(userId);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    return new UserResponseDto(user);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    const { password, login } = createUserDto;
    const newUser = this.usersService.createUser(login, password);
    return new UserResponseDto(newUser);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updateUser(
    @Param('id', new ParseUUIDPipe()) userId: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): UserResponseDto {
    const { oldPassword, newPassword } = updatePasswordDto;
    const user = this.usersService.findUserById(userId);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    if (user.password !== oldPassword) {
      throw new ForbiddenException('Incorrect old password');
    }
    const updatedUser = this.usersService.updateUser(userId, {
      password: newPassword,
    });
    return new UserResponseDto(updatedUser);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid UUID format for userId'),
      }),
    )
    userId: string,
  ): void {
    const user = this.usersService.findUserById(userId);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    this.usersService.deleteUser(userId);
  }
}
