import { Inject, Injectable } from '@nestjs/common';
import { Artist } from './interfaces/artist.interface';
import { ArtistRepository } from '../database/artist.repository';

@Injectable()
export class ArtistsService {
  constructor(
    @Inject('ArtistRepository')
    private readonly artistRepository: ArtistRepository,
  ) {}

  async getAllArtists(): Promise<Artist[]> {
    return await this.artistRepository.getAllArtists();
  }

  async createArtist(name: string, grammy: boolean): Promise<Artist> {
    return await this.artistRepository.createArtist(name, grammy);
  }

  async getArtistById(id: string): Promise<Artist | undefined> {
    return await this.artistRepository.getArtistById(id);
  }

  async updateArtist(
    id: string,
    updatedData: Partial<Artist>,
  ): Promise<Artist | undefined> {
    return await this.artistRepository.updateArtist(id, updatedData);
  }

  async deleteArtist(id: string): Promise<boolean> {
    return await this.artistRepository.deleteArtist(id);
  }
}
