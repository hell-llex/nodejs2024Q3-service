import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RefreshTokenRepository {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  private parseExpirationTime(expirationString: string): number {
    const hours = parseInt(expirationString.replace('h', ''));
    const millisecondsInHour = 60 * 60 * 1000;
    return hours * millisecondsInHour;
  }

  async saveRefreshToken(token: string, userId: string) {
    const expirationTime = this.parseExpirationTime(
      this.configService.get<string>('TOKEN_REFRESH_EXPIRE_TIME'),
    );
    const now = Date.now();

    await this.removeRefreshToken(token);

    return await this.prisma.refreshToken.create({
      data: {
        token,
        userId,
        createdAt: now,
        expiresAt: now + expirationTime,
      },
    });
  }

  async removeRefreshToken(token: string) {
    return await this.prisma.refreshToken.deleteMany({
      where: { token },
    });
  }

  async findRefreshToken(token: string) {
    console.log('token :>> ', token);
    return await this.prisma.refreshToken.findUnique({
      where: {
        token,
      },
      include: {
        user: true,
      },
    });
  }
}
