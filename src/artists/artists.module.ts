// src/artists/artists.module.ts

import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { DatabaseModule } from '../database/database.module';
import { ArtistRepository } from '../database/artist.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [ArtistsController],
  providers: [
    ArtistsService,
    ArtistRepository,
    {
      provide: 'ArtistRepository',
      useClass: ArtistRepository,
    },
  ],
  exports: [ArtistsService], // Добавляем экспорт сервиса
})
export class ArtistsModule {}
