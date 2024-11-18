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
import { TrackService } from './track.service';
import { CreateTrackDto, UpdateTrackDto } from './dto/track.dto';
import { Track } from './interfaces/track.interface';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllTrack() {
    return await this.trackService.getAllTrack();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getTrackById(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid UUID format for trackId'),
      }),
    )
    id: string,
  ): Promise<Track> {
    const track = await this.trackService.getTrackById(id);
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    return await this.trackService.getTrackById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTrack(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    const { name, artistId, albumId, duration } = createTrackDto;
    return await this.trackService.createTrack(
      name,
      artistId,
      albumId,
      duration,
    );
  }

  @Put(':id')
  async updateTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const track = await this.trackService.getTrackById(id);
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    return await this.trackService.updateTrack(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid UUID format for trackId'),
      }),
    )
    id: string,
  ): Promise<void> {
    const track = await this.trackService.getTrackById(id);
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    await this.trackService.deleteTrack(id);
  }
}
