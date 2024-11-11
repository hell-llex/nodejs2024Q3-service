// src/favorites/artists.module.ts

import { forwardRef, Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { DatabaseModule } from '../database/database.module';
import { AlbumModule } from '../album/album.module';
import { FavoritesRepository } from '../database/favorites.repository';
import { TrackModule } from '../track/track.module';
import { ArtistsModule } from '../artists/artists.module';

@Module({
  imports: [DatabaseModule, TrackModule, ArtistsModule, AlbumModule],
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    { provide: 'FavoritesRepository', useClass: FavoritesRepository },
  ],
})
export class FavoritesModule {}
