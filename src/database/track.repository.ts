// src/database/track.repository.ts

import { Injectable } from '@nestjs/common';
import { Track } from '../track/interfaces/track.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrackRepository {
  private tracks: Map<string, Track> = new Map();

  createTrack(
    name: string,
    artistId: string,
    albumId: string,
    duration: number,
  ): Track {
    const newTrack: Track = {
      id: uuidv4(),
      name,
      artistId: artistId ?? null,
      albumId: albumId ?? null,
      duration,
    };
    this.tracks.set(newTrack.id, newTrack);
    return newTrack;
  }

  getTrackById(id: string): Track | undefined {
    return this.tracks.get(id);
  }

  getAllTrack(): Track[] {
    return Array.from(this.tracks.values());
  }

  updateTrack(id: string, updatedData: Partial<Track>): Track {
    const existingTrack = this.tracks.get(id);
    if (!existingTrack) return undefined;

    const updatedTrack = {
      ...existingTrack,
      ...updatedData,
    };
    this.tracks.set(id, updatedTrack);
    return updatedTrack;
  }

  deleteTrack(id: string): boolean {
    return this.tracks.delete(id);
  }
}
