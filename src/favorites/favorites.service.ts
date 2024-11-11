// src/favorites/favorites.service.ts

import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ResponseFavorites } from './interfaces/favorites.interface';
import { FavoritesRepository } from '../database/favorites.repository';
import { AlbumRepository } from '../database/album.repository';
import { TrackRepository } from '../database/track.repository';
import { ArtistRepository } from '../database/artist.repository';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject('FavoritesRepository')
    private readonly favoritesRepository: FavoritesRepository,
    @Inject('TrackRepository')
    private readonly trackRepository: TrackRepository,
    @Inject('ArtistRepository')
    private readonly artistRepository: ArtistRepository,
    @Inject('AlbumRepository')
    private readonly albumRepository: AlbumRepository,
  ) {}

  getAllFavorites(): ResponseFavorites {
    return this.favoritesRepository.getAllFavorites();
  }

  updateTrackFavorites(id: string): { message: string } {
    const track = this.trackRepository.getTrackById(id);
    if (!track) {
      throw new UnprocessableEntityException(
        `Favorites with id ${id} not found`,
      );
    }
    return this.favoritesRepository.updateTrackFavorites(id);
  }

  deleteTrackFromFavorites(id: string): void {
    const track = this.trackRepository.getTrackById(id);
    if (!track) {
      throw new UnprocessableEntityException(
        `Favorites with id ${id} not found`,
      );
    }
    this.favoritesRepository.deleteTrackFromFavorites(id);
  }

  updateArtistFavorites(id: string): { message: string } {
    const artist = this.artistRepository.getArtistById(id);
    if (!artist) {
      throw new UnprocessableEntityException(
        `Favorites with id ${id} not found`,
      );
    }
    return this.favoritesRepository.updateArtistFavorites(id);
  }

  deleteArtistFromFavorites(id: string): void {
    const artist = this.artistRepository.getArtistById(id);
    if (!artist) {
      throw new UnprocessableEntityException(
        `Favorites with id ${id} not found`,
      );
    }
    this.favoritesRepository.deleteArtistFromFavorites(id);
  }

  updateAlbumFavorites(id: string): { message: string } {
    const album = this.albumRepository.getAlbumById(id);
    if (!album) {
      throw new UnprocessableEntityException(
        `Favorites with id ${id} not found`,
      );
    }
    return this.favoritesRepository.updateAlbumFavorites(id);
  }

  deleteAlbumFromFavorites(id: string): void {
    const album = this.albumRepository.getAlbumById(id);
    if (!album) {
      throw new UnprocessableEntityException(
        `Favorites with id ${id} not found`,
      );
    }
    this.favoritesRepository.deleteAlbumFromFavorites(id);
  }
}
