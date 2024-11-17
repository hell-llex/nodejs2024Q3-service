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

  async getAllFavorites(): Promise<ResponseFavorites> {
    return await this.favoritesRepository.getAllFavorites();
  }

  async updateTrackFavorites(id: string): Promise<{ message: string }> {
    const track = await this.trackRepository.getTrackById(id);
    if (!track) {
      throw new UnprocessableEntityException(
        `Favorites with id ${id} not found`,
      );
    }
    return await this.favoritesRepository.updateTrackFavorites(id);
  }

  async deleteTrackFromFavorites(id: string): Promise<void> {
    const track = await this.trackRepository.getTrackById(id);
    if (!track) {
      throw new UnprocessableEntityException(
        `Favorites with id ${id} not found`,
      );
    }
    await this.favoritesRepository.deleteTrackFromFavorites(id);
  }

  async updateArtistFavorites(id: string): Promise<{ message: string }> {
    const artist = await this.artistRepository.getArtistById(id);
    if (!artist) {
      throw new UnprocessableEntityException(
        `Favorites with id ${id} not found`,
      );
    }
    return await this.favoritesRepository.updateArtistFavorites(id);
  }

  async deleteArtistFromFavorites(id: string): Promise<void> {
    const artist = await this.artistRepository.getArtistById(id);
    if (!artist) {
      throw new UnprocessableEntityException(
        `Favorites with id ${id} not found`,
      );
    }
    await this.favoritesRepository.deleteArtistFromFavorites(id);
  }

  async updateAlbumFavorites(id: string): Promise<{ message: string }> {
    const album = await this.albumRepository.getAlbumById(id);
    if (!album) {
      throw new UnprocessableEntityException(
        `Favorites with id ${id} not found`,
      );
    }
    return await this.favoritesRepository.updateAlbumFavorites(id);
  }

  async deleteAlbumFromFavorites(id: string): Promise<void> {
    const album = await this.albumRepository.getAlbumById(id);
    if (!album) {
      throw new UnprocessableEntityException(
        `Favorites with id ${id} not found`,
      );
    }
    await this.favoritesRepository.deleteAlbumFromFavorites(id);
  }
}
