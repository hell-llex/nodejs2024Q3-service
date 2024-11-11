// src/database/track.repository.ts

// import { Injectable } from '@nestjs/common';
// import { Track } from '../track/interfaces/track.interface';
// import { v4 as uuidv4 } from 'uuid';

// @Injectable()
// export class TrackRepository {
//   private tracks: Map<string, Track> = new Map();

//   createTrack(
//     name: string,
//     artistId: string,
//     albumId: string,
//     duration: number,
//   ): Track {
//     const newTrack: Track = {
//       id: uuidv4(),
//       name,
//       artistId: artistId ?? null,
//       albumId: albumId ?? null,
//       duration,
//     };
//     this.tracks.set(newTrack.id, newTrack);
//     return newTrack;
//   }

//   getTrackById(id: string): Track | undefined {
//     return this.tracks.get(id);
//   }

//   getAllTrack(): Track[] {
//     const tracks = Array.from(this.tracks.values());
//     console.log('tracks :>> ', tracks);
//     return tracks;
//   }

//   updateTrack(id: string, updatedData: Partial<Track>): Track {
//     const existingTrack = this.tracks.get(id);
//     if (!existingTrack) return undefined;

//     const updatedTrack = {
//       ...existingTrack,
//       ...updatedData,
//     };
//     this.tracks.set(id, updatedTrack);
//     return updatedTrack;
//   }

//   deleteTrack(id: string): boolean {
//     return this.tracks.delete(id);
//   }
// }
import { Injectable } from '@nestjs/common';
import { Track } from '../track/interfaces/track.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrackRepository {
  // private readonly instanceId = Math.random();
  private tracks: Track[] = [];
  // constructor() {
  //   console.log('Created TrackRepository instance:', this.instanceId);
  // }
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
    this.tracks.push(newTrack);
    return newTrack;
  }

  getTrackById(id: string): Track | undefined {
    return this.tracks.find((track) => track.id === id);
  }

  getAllTrack(): Track[] {
    // console.log('tracks :>> ', this.tracks);
    return this.tracks;
  }

  updateTrack(id: string, updatedData: Partial<Track>): Track {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) return undefined;

    const updatedTrack = {
      ...this.tracks[trackIndex],
      ...updatedData,
    };

    this.tracks[trackIndex] = updatedTrack;
    return updatedTrack;
  }

  deleteTrack(id: string): boolean {
    const initialLength = this.tracks.length;
    this.tracks = this.tracks.filter((track) => track.id !== id);
    return initialLength !== this.tracks.length;
  }
}
