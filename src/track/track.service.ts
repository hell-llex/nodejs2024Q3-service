import { Inject, Injectable } from '@nestjs/common';
import { Track } from './interfaces/track.interface';
import { TrackRepository } from '../database/track.repository';

@Injectable()
export class TrackService {
  constructor(
    @Inject('TrackRepository')
    private readonly trackRepository: TrackRepository,
  ) {}

  async getAllTrack(): Promise<Track[]> {
    return await this.trackRepository.getAllTrack();
  }

  async createTrack(
    name: string,
    artistId: string,
    albumId: string,
    duration: number,
  ): Promise<Track> {
    return await this.trackRepository.createTrack(
      name,
      artistId,
      albumId,
      duration,
    );
  }

  async getTrackById(id: string): Promise<Track | undefined> {
    return await this.trackRepository.getTrackById(id);
  }

  async updateTrack(
    id: string,
    updatedData: Partial<Track>,
  ): Promise<Track | undefined> {
    return await this.trackRepository.updateTrack(id, updatedData);
  }

  async deleteTrack(id: string): Promise<boolean> {
    return await this.trackRepository.deleteTrack(id);
  }
}
