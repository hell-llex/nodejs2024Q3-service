import { Injectable } from '@nestjs/common';
import { Track } from '../track/interfaces/track.interface';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from './prisma.service';

@Injectable()
export class TrackRepository {
  constructor(private prisma: PrismaService) {}

  async createTrack(
    name: string,
    artistId: string,
    albumId: string,
    duration: number,
  ): Promise<Track> {
    return this.prisma.track.create({
      data: {
        id: uuidv4(),
        name,
        artistId: artistId ?? null,
        albumId: albumId ?? null,
        duration,
      },
    });
  }

  async getTrackById(id: string): Promise<Track | null> {
    return this.prisma.track.findUnique({
      where: { id },
    });
  }

  async getAllTrack(): Promise<Track[]> {
    return this.prisma.track.findMany();
  }

  async updateTrack(id: string, updatedData: Partial<Track>): Promise<Track> {
    return this.prisma.track.update({
      where: { id },
      data: updatedData,
    });
  }

  async deleteTrack(id: string): Promise<boolean> {
    const track = await this.prisma.track.delete({
      where: { id },
    });
    return !!track;
  }
}
