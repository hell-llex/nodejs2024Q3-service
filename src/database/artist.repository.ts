// src/database/artist.repository.ts

import { Injectable } from '@nestjs/common';
import { Artist } from '../artists/interfaces/artist.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistRepository {
  private artists: Map<string, Artist> = new Map();

  createArtist(name: string, grammy: boolean): Artist {
    const newArtist: Artist = {
      id: uuidv4(),
      name,
      grammy,
    };
    this.artists.set(newArtist.id, newArtist);
    return newArtist;
  }

  getArtistById(id: string): Artist | undefined {
    return this.artists.get(id);
  }

  getAllArtists(): Artist[] {
    return Array.from(this.artists.values());
  }

  updateArtist(id: string, updatedData: Partial<Artist>): Artist {
    const existingArtist = this.artists.get(id);
    if (!existingArtist) return undefined;

    const updatedArtist = {
      ...existingArtist,
      ...updatedData,
    };
    this.artists.set(id, updatedArtist);
    return updatedArtist;
  }

  deleteArtist(id: string): boolean {
    return this.artists.delete(id);
  }
}
