import { Injectable } from '@nestjs/common';
import { Album } from '../album/interfaces/album.interface';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from './prisma.service';

@Injectable()
export class AlbumRepository {
  constructor(private prisma: PrismaService) {}

  async createAlbum(
    name: string,
    artistId: string,
    year: number,
  ): Promise<Album> {
    return this.prisma.album.create({
      data: {
        id: uuidv4(),
        name,
        artistId: artistId ?? null,
        year,
      },
    });
  }

  async getAlbumById(id: string): Promise<Album | null> {
    return this.prisma.album.findUnique({
      where: { id },
    });
  }

  async getAllAlbum(): Promise<Album[]> {
    return this.prisma.album.findMany();
  }

  async updateAlbum(id: string, updatedData: Partial<Album>): Promise<Album> {
    return this.prisma.album.update({
      where: { id },
      data: updatedData,
    });
  }

  async deleteAlbum(id: string): Promise<boolean> {
    const album = await this.prisma.album.delete({
      where: { id },
    });
    return !!album;
  }
}
