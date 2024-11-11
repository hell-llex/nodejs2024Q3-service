// src/albums/albums.service.ts

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
    // console.log('id :>> ', id);
    this.favoritesRepository.deleteAlbumFromFavorites(id);

    // console.log('TrackRepository instance:', this.trackRepository);

    const tracks = this.trackRepository.getAllTrack();
    tracks.forEach((track) => {
      if (track.albumId && track.albumId === id) {
        // console.log('track 1:>> ', track);
        this.trackRepository.updateTrack(track.id, { albumId: null });
        // console.log('track 2:>> ', track);
      }
    });
    return this.albumRepository.deleteAlbum(id);
  }
}
