import { Inject, Injectable } from '@nestjs/common';
import {
  Favorites,
  ResponseFavorites,
} from '../favorites/interfaces/favorites.interface';
import { Album } from '../album/interfaces/album.interface';
import { Artist } from '../artists/interfaces/artist.interface';
import { Track } from '../track/interfaces/track.interface';
import { AlbumRepository } from './album.repository';
import { ArtistRepository } from './artist.repository';
import { TrackRepository } from './track.repository';

@Injectable()
export class FavoritesRepository {
  // constructor(
  //   // @Inject('ArtistRepository')
  //   private readonly artistRepository: ArtistRepository,
  //   // @Inject('AlbumRepository')
  //   private readonly albumRepository: AlbumRepository,
  //   // @Inject('TrackRepository')
  //   private readonly trackRepository: TrackRepository,
  // ) {}
  constructor(
    @Inject('ArtistRepository')
    private readonly artistRepository: ArtistRepository,
    @Inject('AlbumRepository')
    private readonly albumRepository: AlbumRepository,
    @Inject('TrackRepository')
    private readonly trackRepository: TrackRepository,
  ) {}

  private favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  getAllFavorites(): ResponseFavorites {
    const artists = this.favorites.artists
      .map((id) => this.artistRepository.getArtistById(id))
      .filter((artist) => artist !== undefined) as Artist[];

    const albums = this.favorites.albums
      .map((id) => this.albumRepository.getAlbumById(id))
      .filter((album) => album !== undefined) as Album[];

    const tracks = this.favorites.tracks
      .map((id) => this.trackRepository.getTrackById(id))
      .filter((track) => track !== undefined) as Track[];

    return {
      artists,
      albums,
      tracks,
    };
  }

  getAlbumById(id: string): Album | undefined {
    return this.albumRepository.getAlbumById(id);
  }

  updateArtistFavorites(artistId: string): string {
    if (!this.favorites.artists.includes(artistId)) {
      this.favorites.artists.push(artistId);
      return 'Artist successfully added to favorites';
    }
    return 'Artist was already in favorites';
  }

  updateAlbumFavorites(albumId: string): string {
    if (!this.favorites.albums.includes(albumId)) {
      this.favorites.albums.push(albumId);
      return 'Album successfully added to favorites';
    }
    return 'Album was already in favorites';
  }

  updateTrackFavorites(trackId: string): { message: string } {
    if (!this.favorites.tracks.includes(trackId)) {
      this.favorites.tracks.push(trackId);
      return { message: 'Track successfully added to favorites' };
    }
    return { message: 'Track was already in favorites' };
  }

  deleteArtistFromFavorites(artistId: string): void {
    this.favorites.artists = this.favorites.artists.filter(
      (id) => id !== artistId,
    );
  }

  deleteAlbumFromFavorites(albumId: string): void {
    this.favorites.albums = this.favorites.albums.filter(
      (id) => id !== albumId,
    );
  }

  deleteTrackFromFavorites(trackId: string): void {
    this.favorites.tracks = this.favorites.tracks.filter(
      (id) => id !== trackId,
    );
  }
}