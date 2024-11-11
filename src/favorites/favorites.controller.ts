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
  NotFoundException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ResponseFavorites } from './interfaces/favorites.interface';

import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { ArtistsService } from '../artists/artists.service';

@Controller('favs')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    // @Inject('TrackService')
    private readonly trackService: TrackService,
    // @Inject('ArtistsService')
    private readonly artistsService: ArtistsService,
    // @Inject('AlbumService')
    private readonly albumService: AlbumService,
  ) {}

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
    const track = this.trackService.getTrackById(id);
    if (!track) {
      throw new NotFoundException(`Favorites with id ${id} not found`);
    }
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
    const track = this.trackService.getTrackById(id);
    if (!track) {
      throw new NotFoundException(`Favorites with id ${id} not found`);
    }
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
  ): string {
    const artist = this.artistsService.getArtistById(id);
    if (!artist) {
      throw new NotFoundException(`Favorites with id ${id} not found`);
    }
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
    const artist = this.artistsService.getArtistById(id);
    if (!artist) {
      throw new NotFoundException(`Favorites with id ${id} not found`);
    }
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
  ): string {
    const album = this.albumService.getAlbumById(id);
    if (!album) {
      throw new NotFoundException(`Favorites with id ${id} not found`);
    }
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
    const album = this.albumService.getAlbumById(id);
    if (!album) {
      throw new NotFoundException(`Favorites with id ${id} not found`);
    }
    this.favoritesService.deleteAlbumFromFavorites(id);
  }
}
