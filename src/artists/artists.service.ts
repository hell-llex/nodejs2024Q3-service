// src/artists/artists.service.ts

import { Inject, Injectable } from '@nestjs/common';
import { Artist } from './interfaces/artist.interface';
import { ArtistRepository } from '../database/artist.repository';
import { AlbumRepository } from '../database/album.repository';
import { FavoritesRepository } from '../database/favorites.repository';
import { TrackRepository } from '../database/track.repository';

@Injectable()
export class ArtistsService {
  constructor(
    @Inject('ArtistRepository')
    private readonly artistRepository: ArtistRepository,
    @Inject('FavoritesRepository')
    private readonly favoritesRepository: FavoritesRepository,
    @Inject('TrackRepository')
    private readonly trackRepository: TrackRepository,
    @Inject('AlbumRepository')
    private readonly albumRepository: AlbumRepository,
  ) {}

  getAllArtists(): Artist[] {
    return this.artistRepository.getAllArtists();
  }

  createArtist(name: string, grammy: boolean): Artist {
    return this.artistRepository.createArtist(name, grammy);
  }

  getArtistById(id: string): Artist | undefined {
    return this.artistRepository.getArtistById(id);
  }

  updateArtist(id: string, updatedData: Partial<Artist>): Artist | undefined {
    return this.artistRepository.updateArtist(id, updatedData);
  }

  async deleteArtist(id: string): Promise<boolean> {
    this.favoritesRepository.deleteArtistFromFavorites(id);
    (await this.albumRepository.getAllAlbum()).forEach((album) => {
      if (album.artistId && album.artistId === id) {
        this.albumRepository.updateAlbum(album.id, { artistId: null });
      }
    });
    this.trackRepository.getAllTrack().forEach((track) => {
      if (track.artistId && track.artistId === id) {
        this.trackRepository.updateTrack(track.id, { artistId: null });
      }
    });
    return this.artistRepository.deleteArtist(id);
  }
}
