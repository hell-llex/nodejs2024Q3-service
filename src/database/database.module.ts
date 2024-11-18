import { Global, Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { ArtistRepository } from './artist.repository';
import { TrackRepository } from './track.repository';
import { AlbumRepository } from './album.repository';
import { FavoritesRepository } from './favorites.repository';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: 'TrackRepository',
      useClass: TrackRepository,
    },
    {
      provide: 'AlbumRepository',
      useClass: AlbumRepository,
    },
    {
      provide: 'ArtistRepository',
      useClass: ArtistRepository,
    },
    {
      provide: 'FavoritesRepository',
      useClass: FavoritesRepository,
    },
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
  ],
  exports: [
    PrismaService,
    'TrackRepository',
    'AlbumRepository',
    'ArtistRepository',
    'FavoritesRepository',
    'UserRepository',
  ],
})
export class DatabaseModule {}
