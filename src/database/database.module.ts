import { Global, Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { ArtistRepository } from './artist.repository';
import { TrackRepository } from './track.repository';
import { AlbumRepository } from './album.repository';
import { FavoritesRepository } from './favorites.repository';

@Global()
@Module({
  providers: [
    {
      provide: 'FavoritesRepository',
      useClass: FavoritesRepository,
    },
    TrackRepository,
    ArtistRepository,
    AlbumRepository,
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
    FavoritesRepository,
  ],
  exports: [
    AlbumRepository,
    'TrackRepository',
    'AlbumRepository',
    'ArtistRepository',
    'FavoritesRepository',
    FavoritesRepository,
  ],
})
export class DatabaseModule {}
