import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { User } from '../user/interfaces/user.interface';
import { UserRepository } from '../database/user.repository';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserRepository')
    private userRepository: UserRepository,
    // @Inject('JwtService')
    private jwtService: JwtService,
  ) {}
  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userRepository.getUserByLogin(userDto.login);
    if (candidate) {
      throw new BadRequestException(`User already exists`);
    }

    const hashPassword = await hash(userDto.password, process.env.CRYPT_SALT);
    const user = await this.userRepository.createUser(
      userDto.login,
      hashPassword,
    );
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { login: user.login, id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userRepository.getUserByLogin(userDto.login);
    const passwordEquals = await compare(userDto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException('Incorrect login or password');
  }
}
