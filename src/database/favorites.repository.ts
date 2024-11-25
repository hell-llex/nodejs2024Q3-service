import { Injectable } from '@nestjs/common';
import { ResponseFavorites } from '../favorites/interfaces/favorites.interface';
import { PrismaService } from './prisma.service';

@Injectable()
export class FavoritesRepository {
  constructor(private prisma: PrismaService) {}

  async getAllFavorites(): Promise<ResponseFavorites> {
    const favorites = await this.prisma.favorites.findFirst({
      include: {
        artists: {
          include: {
            artist: true,
          },
        },
        albums: {
          include: {
            album: true,
          },
        },
        tracks: {
          include: {
            track: true,
          },
        },
      },
    });

    return {
      artists: favorites?.artists.map((fa) => fa.artist) || [],
      albums: favorites?.albums.map((fa) => fa.album) || [],
      tracks: favorites?.tracks.map((ft) => ft.track) || [],
    };
  }

  async updateArtistFavorites(artistId: string): Promise<{ message: string }> {
    let favorites = await this.prisma.favorites.findFirst();

    if (!favorites) {
      favorites = await this.prisma.favorites.create({
        data: {
          artists: {
            create: [{ artistId }],
          },
        },
      });
      return { message: 'Artist successfully added to favorites' };
    }

    const existingFavorite = await this.prisma.favoritesArtists.findFirst({
      where: {
        favoriteId: favorites.id,
        artistId: artistId,
      },
    });

    if (!existingFavorite) {
      await this.prisma.favoritesArtists.create({
        data: {
          favoriteId: favorites.id,
          artistId: artistId,
        },
      });
      return { message: 'Artist successfully added to favorites' };
    }

    return { message: 'Artist was already in favorites' };
  }

  async updateAlbumFavorites(albumId: string): Promise<{ message: string }> {
    let favorites = await this.prisma.favorites.findFirst();

    if (!favorites) {
      favorites = await this.prisma.favorites.create({
        data: {
          albums: {
            create: [{ albumId }],
          },
        },
      });
      return { message: 'Album successfully added to favorites' };
    }

    const existingFavorite = await this.prisma.favoritesAlbums.findFirst({
      where: {
        favoriteId: favorites.id,
        albumId: albumId,
      },
    });

    if (!existingFavorite) {
      await this.prisma.favoritesAlbums.create({
        data: {
          favoriteId: favorites.id,
          albumId: albumId,
        },
      });
      return { message: 'Album successfully added to favorites' };
    }

    return { message: 'Album was already in favorites' };
  }

  async updateTrackFavorites(trackId: string): Promise<{ message: string }> {
    let favorites = await this.prisma.favorites.findFirst();

    if (!favorites) {
      favorites = await this.prisma.favorites.create({
        data: {
          tracks: {
            create: [{ trackId }],
          },
        },
      });
      return { message: 'Track successfully added to favorites' };
    }

    const existingFavorite = await this.prisma.favoritesTracks.findFirst({
      where: {
        favoriteId: favorites.id,
        trackId: trackId,
      },
    });

    if (!existingFavorite) {
      await this.prisma.favoritesTracks.create({
        data: {
          favoriteId: favorites.id,
          trackId: trackId,
        },
      });
      return { message: 'Track successfully added to favorites' };
    }

    return { message: 'Track was already in favorites' };
  }

  async deleteArtistFromFavorites(artistId: string): Promise<void> {
    const favorites = await this.prisma.favorites.findFirst();
    if (favorites) {
      await this.prisma.favoritesArtists.deleteMany({
        where: {
          favoriteId: favorites.id,
          artistId: artistId,
        },
      });
    }
  }

  async deleteAlbumFromFavorites(albumId: string): Promise<void> {
    const favorites = await this.prisma.favorites.findFirst();
    if (favorites) {
      await this.prisma.favoritesAlbums.deleteMany({
        where: {
          favoriteId: favorites.id,
          albumId: albumId,
        },
      });
    }
  }

  async deleteTrackFromFavorites(trackId: string): Promise<void> {
    const favorites = await this.prisma.favorites.findFirst();
    if (favorites) {
      await this.prisma.favoritesTracks.deleteMany({
        where: {
          favoriteId: favorites.id,
          trackId: trackId,
        },
      });
    }
  }
}
