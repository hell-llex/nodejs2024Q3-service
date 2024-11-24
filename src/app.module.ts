import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ArtistsModule } from './artists/artists.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { FavoritesModule } from './favorites/favorites.module';
import { AlbumService } from './album/album.service';
import { ArtistsService } from './artists/artists.service';
import { FavoritesRepository } from './database/favorites.repository';
import { TrackService } from './track/track.service';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

const jwtConfig = {
  secret: new ConfigService().get<string>('JWT_SECRET_KEY', 'SECRET'),
  signOptions: {
    expiresIn: new ConfigService().get<string>('TOKEN_EXPIRE_TIME', '1h'),
  },
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register(jwtConfig),
    UserModule,
    TrackModule,
    ArtistsModule,
    AlbumModule,
    DatabaseModule,
    FavoritesModule,
    AuthModule,
  ],
  providers: [
    {
      provide: 'TrackService',
      useClass: TrackService,
    },
    {
      provide: 'ArtistsService',
      useClass: ArtistsService,
    },
    {
      provide: 'AlbumService',
      useClass: AlbumService,
    },
    {
      provide: 'FavoritesRepository',
      useClass: FavoritesRepository,
    },
    {
      provide: 'AuthService',
      useClass: AuthService,
    },
  ],
})
export class AppModule {}
