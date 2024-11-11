import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  artistId: string;

  @IsNumber()
  year: number;
}

export class UpdateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  artistId: string;

  @IsNumber()
  year: number;
}
