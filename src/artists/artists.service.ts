// src/artists/artists.service.ts

import { Inject, Injectable } from '@nestjs/common';
import { Artist } from './interfaces/artist.interface';
import { ArtistRepository } from '../database/artist.repository';

@Injectable()
export class ArtistsService {
  constructor(
    // @Inject('ArtistRepository')
    private readonly artistRepository: ArtistRepository,
  ) {}

  getAllArtists(): Artist[] {
    return this.artistRepository.getAllArtists();
  }

  createArtist(name: string, grammy: boolean): Artist {
    return this.artistRepository.createArtist(name, grammy);
  }

  getArtistById(id: string): Artist | undefined {
    return this.artistRepository.getArtistById(id);
  }

  updateArtist(id: string, updatedData: Partial<Artist>): Artist | undefined {
    return this.artistRepository.updateArtist(id, updatedData);
  }

  deleteArtist(id: string): boolean {
    return this.artistRepository.deleteArtist(id);
  }
}
