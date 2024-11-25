import { Inject, Injectable } from '@nestjs/common';
import { Album } from './interfaces/album.interface';
import { AlbumRepository } from '../database/album.repository';

@Injectable()
export class AlbumService {
  constructor(
    @Inject('AlbumRepository')
    private readonly albumRepository: AlbumRepository,
  ) {}

  async getAllAlbum(): Promise<Album[]> {
    return await this.albumRepository.getAllAlbum();
  }

  async createAlbum(
    name: string,
    artistId: string,
    year: number,
  ): Promise<Album> {
    return await this.albumRepository.createAlbum(name, artistId, year);
  }

  async getAlbumById(id: string): Promise<Album | undefined> {
    return await this.albumRepository.getAlbumById(id);
  }

  async updateAlbum(
    id: string,
    updatedData: Partial<Album>,
  ): Promise<Album | undefined> {
    return await this.albumRepository.updateAlbum(id, updatedData);
  }

  async deleteAlbum(id: string): Promise<boolean> {
    return await this.albumRepository.deleteAlbum(id);
  }
}
