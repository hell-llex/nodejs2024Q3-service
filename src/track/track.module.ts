// src/track/artists.module.ts

import { forwardRef, Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { DatabaseModule } from '../database/database.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { TrackRepository } from '../database/track.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [TrackController],
  providers: [
    TrackService,
    { provide: 'TrackRepository', useClass: TrackRepository },
  ],
  exports: [TrackService],
})
export class TrackModule {}
