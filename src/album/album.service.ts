// src/albums/albums.service.ts

import { Inject, Injectable } from '@nestjs/common';
import { Album } from './interfaces/album.interface';
import { AlbumRepository } from '../database/album.repository';

@Injectable()
export class AlbumService {
  constructor(
    // @Inject('AlbumRepository')
    private readonly albumRepository: AlbumRepository,
  ) {}

  getAllAlbum(): Album[] {
    return this.albumRepository.getAllAlbum();
  }

  createAlbum(name: string, artistId: string, year: number): Album {
    return this.albumRepository.createAlbum(name, artistId, year);
  }

  getAlbumById(id: string): Album | undefined {
    return this.albumRepository.getAlbumById(id);
  }

  updateAlbum(id: string, updatedData: Partial<Album>): Album | undefined {
    return this.albumRepository.updateAlbum(id, updatedData);
  }

  deleteAlbum(id: string): boolean {
    return this.albumRepository.deleteAlbum(id);
  }
}
