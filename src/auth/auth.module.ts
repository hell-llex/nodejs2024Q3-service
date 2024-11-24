import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

const jwtConfig = {
  secret: new ConfigService().get<string>('JWT_SECRET_KEY', 'SECRET'),
  signOptions: {
    expiresIn: new ConfigService().get<string>('TOKEN_EXPIRE_TIME', '1h'),
  },
};

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'JwtService',
      useClass: JwtService,
    },
  ],
  imports: [forwardRef(() => UserModule), JwtModule.register(jwtConfig)],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
