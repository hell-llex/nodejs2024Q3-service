// src/tracks/tracks.service.ts

import { Inject, Injectable } from '@nestjs/common';
import { Track } from './interfaces/track.interface';
import { TrackRepository } from '../database/track.repository';

@Injectable()
export class TrackService {
  constructor(
    @Inject('TrackRepository')
    private readonly trackRepository: TrackRepository,
  ) {}

  getAllTrack(): Track[] {
    return this.trackRepository.getAllTrack();
  }

  createTrack(
    name: string,
    artistId: string,
    albumId: string,
    duration: number,
  ): Track {
    return this.trackRepository.createTrack(name, artistId, albumId, duration);
  }

  getTrackById(id: string): Track | undefined {
    return this.trackRepository.getTrackById(id);
  }

  updateTrack(id: string, updatedData: Partial<Track>): Track | undefined {
    return this.trackRepository.updateTrack(id, updatedData);
  }

  deleteTrack(id: string): boolean {
    return this.trackRepository.deleteTrack(id);
  }
}
