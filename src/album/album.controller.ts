// src/album/album.controller.ts

import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto, UpdateAlbumDto } from './dto/album.dto';
import { Album } from './interfaces/album.interface';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllAlbum() {
    return this.albumService.getAllAlbum();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getAlbumById(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid UUID format for albumId'),
      }),
    )
    id: string,
  ): Album {
    const album = this.albumService.getAlbumById(id);
    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    return this.albumService.getAlbumById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createAlbum(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    const { name, artistId, year } = createAlbumDto;
    return this.albumService.createAlbum(name, artistId, year);
  }

  @Put(':id')
  updateAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const album = this.albumService.getAlbumById(id);
    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    return this.albumService.updateAlbum(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid UUID format for albumId'),
      }),
    )
    id: string,
  ): void {
    const album = this.albumService.getAlbumById(id);
    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    this.albumService.deleteAlbum(id);
  }
}
