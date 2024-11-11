// src/favorites/favorites.service.ts

import { Inject, Injectable } from '@nestjs/common';
import { ResponseFavorites } from './interfaces/favorites.interface';
import { FavoritesRepository } from '../database/favorites.repository';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { ArtistsService } from '../artists/artists.service';

@Injectable()
export class FavoritesService {
  constructor(
    // @Inject('FavoritesRepository')
    private readonly favoritesRepository: FavoritesRepository, // , // @Inject('TrackService') // private readonly trackService: TrackService, // @Inject('ArtistsService') // private readonly artistsService: ArtistsService, // @Inject('AlbumService') // private readonly albumService: AlbumService,
  ) {}

  getAllFavorites(): ResponseFavorites {
    return this.favoritesRepository.getAllFavorites();
  }

  updateTrackFavorites(id: string): { message: string } {
    return this.favoritesRepository.updateTrackFavorites(id);
  }

  deleteTrackFromFavorites(id: string): void {
    this.favoritesRepository.deleteTrackFromFavorites(id);
  }

  updateArtistFavorites(id: string): string {
    return this.favoritesRepository.updateArtistFavorites(id);
  }

  deleteArtistFromFavorites(id: string): void {
    this.favoritesRepository.deleteArtistFromFavorites(id);
  }

  updateAlbumFavorites(id: string): string {
    return this.favoritesRepository.updateAlbumFavorites(id);
  }

  deleteAlbumFromFavorites(id: string): void {
    this.favoritesRepository.deleteAlbumFromFavorites(id);
  }
}
