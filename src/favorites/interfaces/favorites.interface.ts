import { Album } from '../../album/interfaces/album.interface';
import { Artist } from '../../artists/interfaces/artist.interface';
import { Track } from '../../track/interfaces/track.interface';

export interface Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export interface ResponseFavorites {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
