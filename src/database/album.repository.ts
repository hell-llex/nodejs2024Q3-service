// src/database/album.repository.ts

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Album } from '../album/interfaces/album.interface';
import { v4 as uuidv4 } from 'uuid';
import { FavoritesRepository } from './favorites.repository';

@Injectable()
export class AlbumRepository {
  // constructor(
  //   // @Inject('FavoritesRepository')
  //   private readonly favoritesRepository: FavoritesRepository,
  // ) {}
  constructor(
    @Inject(forwardRef(() => FavoritesRepository))
    private readonly favoritesRepository: FavoritesRepository,
  ) {}

  private albums: Map<string, Album> = new Map();

  createAlbum(name: string, artistId: string, year: number): Album {
    const newAlbum: Album = {
      id: uuidv4(),
      name,
      artistId: artistId ?? null,
      year,
    };
    this.albums.set(newAlbum.id, newAlbum);
    return newAlbum;
  }

  getAlbumById(id: string): Album | undefined {
    return this.albums.get(id);
  }

  getAllAlbum(): Album[] {
    return Array.from(this.albums.values());
  }

  updateAlbum(id: string, updatedData: Partial<Album>): Album {
    const existingAlbum = this.albums.get(id);
    if (!existingAlbum) return undefined;

    const updatedAlbum = {
      ...existingAlbum,
      ...updatedData,
    };
    this.albums.set(id, updatedAlbum);
    return updatedAlbum;
  }

  deleteAlbum(id: string): boolean {
    this.favoritesRepository.deleteAlbumFromFavorites(id);
    return this.albums.delete(id);
  }
}
