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
    // AlbumRepository,
    // TrackRepository,
    // ArtistRepository,

    // FavoritesRepository,
  ],
  exports: [
    // TrackRepository,
    // AlbumRepository,
    // ArtistRepository,
    // FavoritesRepository,
    'TrackRepository',
    'AlbumRepository',
    'ArtistRepository',
    'FavoritesRepository',
    'UserRepository',
  ],
})
export class DatabaseModule {}
