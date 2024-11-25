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
  UseGuards,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ResponseFavorites } from './interfaces/favorites.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllFavorites(): Promise<ResponseFavorites> {
    return await this.favoritesService.getAllFavorites();
  }

  @UseGuards(JwtAuthGuard)
  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  async updateTrackFavorites(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid UUID format for favoritesId'),
      }),
    )
    id: string,
  ): Promise<{ message: string }> {
    return await this.favoritesService.updateTrackFavorites(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrackFavorites(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid UUID format for favoritesId'),
      }),
    )
    id: string,
  ): Promise<void> {
    await this.favoritesService.deleteTrackFromFavorites(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  async updateArtistFavorites(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid UUID format for favoritesId'),
      }),
    )
    id: string,
  ): Promise<{ message: string }> {
    return await this.favoritesService.updateArtistFavorites(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtistFavorites(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid UUID format for favoritesId'),
      }),
    )
    id: string,
  ): Promise<void> {
    await this.favoritesService.deleteArtistFromFavorites(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  async updateAlbumFavorites(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid UUID format for favoritesId'),
      }),
    )
    id: string,
  ): Promise<{ message: string }> {
    return await this.favoritesService.updateAlbumFavorites(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbumFavorites(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid UUID format for favoritesId'),
      }),
    )
    id: string,
  ): Promise<void> {
    await this.favoritesService.deleteAlbumFromFavorites(id);
  }
}
