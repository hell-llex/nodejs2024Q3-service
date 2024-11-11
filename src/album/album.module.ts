// src/album/artists.module.ts

import { forwardRef, Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { DatabaseModule } from '../database/database.module';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService], // Добавляем экспорт сервиса
})
export class AlbumModule {}
