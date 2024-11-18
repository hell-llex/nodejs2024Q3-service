import { Injectable } from '@nestjs/common';
import { ResponseFavorites } from '../favorites/interfaces/favorites.interface';
import { PrismaService } from './prisma.service';

@Injectable()
export class FavoritesRepository {
  constructor(private prisma: PrismaService) {}

  async getAllFavorites(): Promise<ResponseFavorites> {
    const favorites = await this.prisma.favorites.findFirst();

    const artists = await this.prisma.artist.findMany({
      where: {
        id: {
          in: favorites?.artists || [],
        },
      },
    });

    const albums = await this.prisma.album.findMany({
      where: {
        id: {
          in: favorites?.albums || [],
        },
      },
    });

    const tracks = await this.prisma.track.findMany({
      where: {
        id: {
          in: favorites?.tracks || [],
        },
      },
    });

    return {
      artists,
      albums,
      tracks,
    };
  }

  async updateArtistFavorites(artistId: string): Promise<{ message: string }> {
    const favorites = await this.prisma.favorites.findFirst();

    if (!favorites) {
      await this.prisma.favorites.create({
        data: {
          artists: [artistId],
          albums: [],
          tracks: [],
        },
      });
      return { message: 'Artist successfully added to favorites' };
    }

    if (!favorites.artists.includes(artistId)) {
      await this.prisma.favorites.update({
        where: { id: favorites.id },
        data: {
          artists: [...favorites.artists, artistId],
        },
      });
      return { message: 'Artist successfully added to favorites' };
    }

    return { message: 'Artist was already in favorites' };
  }

  async updateAlbumFavorites(albumId: string): Promise<{ message: string }> {
    const favorites = await this.prisma.favorites.findFirst();

    if (!favorites) {
      await this.prisma.favorites.create({
        data: {
          artists: [],
          albums: [albumId],
          tracks: [],
        },
      });
      return { message: 'Album successfully added to favorites' };
    }

    if (!favorites.albums.includes(albumId)) {
      await this.prisma.favorites.update({
        where: { id: favorites.id },
        data: {
          albums: [...favorites.albums, albumId],
        },
      });
      return { message: 'Album successfully added to favorites' };
    }

    return { message: 'Album was already in favorites' };
  }

  async updateTrackFavorites(trackId: string): Promise<{ message: string }> {
    const favorites = await this.prisma.favorites.findFirst();

    if (!favorites) {
      await this.prisma.favorites.create({
        data: {
          artists: [],
          albums: [],
          tracks: [trackId],
        },
      });
      return { message: 'Track successfully added to favorites' };
    }

    if (!favorites.tracks.includes(trackId)) {
      await this.prisma.favorites.update({
        where: { id: favorites.id },
        data: {
          tracks: [...favorites.tracks, trackId],
        },
      });
      return { message: 'Track successfully added to favorites' };
    }

    return { message: 'Track was already in favorites' };
  }

  async deleteArtistFromFavorites(artistId: string): Promise<void> {
    const favorites = await this.prisma.favorites.findFirst();
    if (favorites) {
      await this.prisma.favorites.update({
        where: { id: favorites.id },
        data: {
          artists: favorites.artists.filter((id) => id !== artistId),
        },
      });
    }
  }

  async deleteAlbumFromFavorites(albumId: string): Promise<void> {
    const favorites = await this.prisma.favorites.findFirst();
    if (favorites) {
      await this.prisma.favorites.update({
        where: { id: favorites.id },
        data: {
          albums: favorites.albums.filter((id) => id !== albumId),
        },
      });
    }
  }

  async deleteTrackFromFavorites(trackId: string): Promise<void> {
    const favorites = await this.prisma.favorites.findFirst();
    if (favorites) {
      await this.prisma.favorites.update({
        where: { id: favorites.id },
        data: {
          tracks: favorites.tracks.filter((id) => id !== trackId),
        },
      });
    }
  }
}
