import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto, UpdateArtistDto } from './dto/artists.dto';
import { Artist } from './interfaces/artist.interface';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllArtists() {
    return await this.artistsService.getAllArtists();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getArtistById(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid UUID format for artistId'),
      }),
    )
    id: string,
  ): Promise<Artist> {
    const artist = await this.artistsService.getArtistById(id);
    if (!artist) {
      throw new NotFoundException(`Artists with id ${id} not found`);
    }
    return await this.artistsService.getArtistById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createArtist(
    @Body() createArtistDto: CreateArtistDto,
  ): Promise<Artist> {
    const { name, grammy } = createArtistDto;
    return await this.artistsService.createArtist(name, grammy);
  }

  @Put(':id')
  async updateArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const artist = await this.artistsService.getArtistById(id);
    if (!artist) {
      throw new NotFoundException(`Artists with id ${id} not found`);
    }
    return await this.artistsService.updateArtist(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid UUID format for artistId'),
      }),
    )
    id: string,
  ): Promise<void> {
    const artist = await this.artistsService.getArtistById(id);
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    await this.artistsService.deleteArtist(id);
  }
}
