// src/favorites/favorites.controller.ts

import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  BadRequestException,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ResponseFavorites } from './interfaces/favorites.interface';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllFavorites(): ResponseFavorites {
    return this.favoritesService.getAllFavorites();
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  updateTrackFavorites(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid UUID format for favoritesId'),
      }),
    )
    id: string,
  ): { message: string } {
    return this.favoritesService.updateTrackFavorites(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrackFavorites(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid UUID format for favoritesId'),
      }),
    )
    id: string,
  ): void {
    this.favoritesService.deleteTrackFromFavorites(id);
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  updateArtistFavorites(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid UUID format for favoritesId'),
      }),
    )
    id: string,
  ): { message: string } {
    return this.favoritesService.updateArtistFavorites(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtistFavorites(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid UUID format for favoritesId'),
      }),
    )
    id: string,
  ): void {
    this.favoritesService.deleteArtistFromFavorites(id);
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  updateAlbumFavorites(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid UUID format for favoritesId'),
      }),
    )
    id: string,
  ): { message: string } {
    return this.favoritesService.updateAlbumFavorites(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbumFavorites(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid UUID format for favoritesId'),
      }),
    )
    id: string,
  ): void {
    this.favoritesService.deleteAlbumFromFavorites(id);
  }
}
