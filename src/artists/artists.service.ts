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

  async getAllArtists(): Promise<Artist[]> {
    return await this.artistRepository.getAllArtists();
  }

  async createArtist(name: string, grammy: boolean): Promise<Artist> {
    return await this.artistRepository.createArtist(name, grammy);
  }

  async getArtistById(id: string): Promise<Artist | undefined> {
    return await this.artistRepository.getArtistById(id);
  }

  async updateArtist(
    id: string,
    updatedData: Partial<Artist>,
  ): Promise<Artist | undefined> {
    return await this.artistRepository.updateArtist(id, updatedData);
  }

  async deleteArtist(id: string): Promise<boolean> {
    await this.favoritesRepository.deleteArtistFromFavorites(id);
    (await this.albumRepository.getAllAlbum()).forEach(async (album) => {
      if (album.artistId && album.artistId === id) {
        await this.albumRepository.updateAlbum(album.id, { artistId: null });
      }
    });
    (await this.trackRepository.getAllTrack()).forEach(async (track) => {
      if (track.artistId && track.artistId === id) {
        await this.trackRepository.updateTrack(track.id, { artistId: null });
      }
    });
    return await this.artistRepository.deleteArtist(id);
  }
}
