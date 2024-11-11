import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    ArtistsModule,
    AlbumModule,
    TrackModule,
    FavoritesModule,
    DatabaseModule,
  ],
  // providers: [
  //   {
  //     provide: 'TrackService',
  //     useClass: TrackService,
  //   },
  //   {
  //     provide: 'ArtistsService',
  //     useClass: ArtistsService,
  //   },
  //   {
  //     provide: 'AlbumService',
  //     useClass: AlbumService,
  //   },
  //   {
  //     provide: 'FavoritesRepository',
  //     useClass: FavoritesRepository,
  //   },
  //   FavoritesService,
  // ],
})
export class AppModule {}
