import { Injectable } from '@nestjs/common';
import { Artist } from '../artists/interfaces/artist.interface';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from './prisma.service';

@Injectable()
export class ArtistRepository {
  constructor(private prisma: PrismaService) {}

  async createArtist(name: string, grammy: boolean): Promise<Artist> {
    return this.prisma.artist.create({
      data: {
        id: uuidv4(),
        name,
        grammy,
      },
    });
  }

  async getArtistById(id: string): Promise<Artist | null> {
    return this.prisma.artist.findUnique({
      where: { id },
    });
  }

  async getAllArtists(): Promise<Artist[]> {
    return this.prisma.artist.findMany();
  }

  async updateArtist(
    id: string,
    updatedData: Partial<Artist>,
  ): Promise<Artist> {
    return this.prisma.artist.update({
      where: { id },
      data: updatedData,
    });
  }

  async deleteArtist(id: string): Promise<boolean> {
    const artist = await this.prisma.artist.delete({
      where: { id },
    });
    return !!artist;
  }
}
