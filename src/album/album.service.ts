import { Inject, Injectable } from '@nestjs/common';
import { Album } from './interfaces/album.interface';
import { AlbumRepository } from '../database/album.repository';
import { TrackRepository } from '../database/track.repository';
import { FavoritesRepository } from '../database/favorites.repository';

@Injectable()
export class AlbumService {
  constructor(
    @Inject('FavoritesRepository')
    private readonly favoritesRepository: FavoritesRepository,
    @Inject('TrackRepository')
    private readonly trackRepository: TrackRepository,
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
    await this.favoritesRepository.deleteAlbumFromFavorites(id);
    const tracks = await this.trackRepository.getAllTrack();
    tracks.forEach(async (track) => {
      if (track.albumId && track.albumId === id) {
        await this.trackRepository.updateTrack(track.id, { albumId: null });
      }
    });
    return await this.albumRepository.deleteAlbum(id);
  }
}
