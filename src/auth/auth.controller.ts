import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async registration(
    @Body(
      'userDto',
      new ValidationPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid login or password format for user'),
      }),
    )
    userDto: CreateUserDto,
  ) {
    return await this.authService.registration(userDto);
  }

  // @Post('/refresh')
  // @HttpCode(HttpStatus.OK)
  // async refresh(@Body() userDto: CreateUserDto) {
  //   return await this.authService.refresh(userDto);
  // }
}
