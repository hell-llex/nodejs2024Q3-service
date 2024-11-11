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
import { CreateUserDto, UpdateUserDto, UserResponseDto } from './dto/users.dto';

@Controller('user')
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
  getUserById(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid UUID format for id'),
      }),
    )
    id: string,
  ): UserResponseDto {
    const user = this.usersService.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
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
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePasswordDto: UpdateUserDto,
  ): UserResponseDto {
    const { oldPassword, newPassword } = updatePasswordDto;
    const user = this.usersService.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    if (user.password !== oldPassword) {
      throw new ForbiddenException('Incorrect old password');
    }
    const updatedUser = this.usersService.updateUser(id, {
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
          new BadRequestException('Invalid UUID format for id'),
      }),
    )
    id: string,
  ): void {
    const user = this.usersService.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    this.usersService.deleteUser(id);
  }
}
