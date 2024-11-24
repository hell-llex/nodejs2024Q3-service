import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { UserRepository } from '../database/user.repository';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenRepository } from '../database/refresh-token.repository';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserRepository')
    private userRepository: UserRepository,
    @Inject('RefreshTokenRepository')
    private refreshTokenRepository: RefreshTokenRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async login(userDto: CreateUserDto) {
    const { login, id } = await this.validateUser(userDto);

    const refreshToken = await this.generateRefreshToken({ login, id });
    const accessToken = await this.generateAccessToken({ login, id });

    await this.refreshTokenRepository.saveRefreshToken(refreshToken, id);

    return { accessToken, refreshToken };
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userRepository.getUserByLogin(userDto.login);
    if (candidate) {
      throw new BadRequestException(`User already exists`);
    }

    const salt = Number(this.configService.get<string>('CRYPT_SALT'));
    const hashPassword = await hash(userDto.password, salt);
    const { login, id } = await this.userRepository.createUser(
      userDto.login,
      hashPassword,
    );

    return {
      accessToken: await this.generateAccessToken({ login, userId: id }),
      refreshToken: await this.generateRefreshToken({ login, userId: id }),
      id: id,
    };
  }

  async refresh(refreshToken: string) {
    const tokenData = await this.refreshTokenRepository.findRefreshToken(
      refreshToken,
    );
    if (!tokenData || Number(tokenData.expiresAt) < Date.now()) {
      throw new ForbiddenException('Invalid refresh token');
    }

    const user = tokenData.user;
    const payload = { login: user.login, userId: user.id };

    const tokens = {
      accessToken: await this.generateAccessToken(payload),
      refreshToken: await this.generateRefreshToken(payload),
      id: user.id,
    };

    await this.refreshTokenRepository.saveRefreshToken(
      tokens.refreshToken,
      user.id,
    );

    return tokens;
  }

  private async generateAccessToken(payload: object | Buffer) {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET_KEY'),
      expiresIn: this.configService.get<string>('TOKEN_EXPIRE_TIME'),
    });
  }

  private async generateRefreshToken(payload: object | Buffer) {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET_REFRESH_KEY'),
      expiresIn: this.configService.get<string>('TOKEN_REFRESH_EXPIRE_TIME'),
    });
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userRepository.getUserByLogin(userDto.login);
    if (!user) {
      throw new ForbiddenException('Incorrect login or password');
    }
    const passwordEquals = await compare(userDto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new ForbiddenException('Incorrect login or password');
  }
}
