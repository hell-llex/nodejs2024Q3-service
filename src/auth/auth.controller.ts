import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './refresh-token.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(
    @Body(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: false,
        dismissDefaultMessages: true,
        exceptionFactory: (errors) => {
          const messages = errors.map((error) => {
            if (error.property === 'login' || error.property === 'password') {
              if (!error.value) {
                return `${error.property} is required`;
              }
              if (typeof error.value !== 'string') {
                return `${error.property} must be a string`;
              }
            }
            return 'Invalid login or password format for user';
          });
          throw new BadRequestException(messages[0]);
        },
      }),
    )
    userDto: CreateUserDto,
  ) {
    return this.authService.login(userDto);
  }

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async registration(
    @Body(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: false,
        dismissDefaultMessages: true,
        exceptionFactory: (errors) => {
          const messages = errors.map((error) => {
            if (error.property === 'login' || error.property === 'password') {
              if (!error.value) {
                return `${error.property} is required`;
              }
              if (typeof error.value !== 'string') {
                return `${error.property} must be a string`;
              }
            }
            return 'Invalid login or password format for user';
          });
          throw new BadRequestException(messages[0]);
        },
      }),
    )
    userDto: CreateUserDto,
  ) {
    return await this.authService.registration(userDto);
  }

  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    const { refreshToken } = refreshTokenDto;
    if (!refreshToken) {
      throw new UnauthorizedException('Invalid refresh token for user');
    }
    return this.authService.refresh(refreshToken);
  }
}
