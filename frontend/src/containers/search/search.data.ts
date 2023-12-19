export interface SongType {
    _index: 'songs',
    _id: string,
    _score: number,
    _source: {
        id: string,
        title: string,
        artist_id: string,
        album_id: string,
        artist_name: string,
        album_title: string,
        genre: string,
        length: number,
        tags: string[]
    }
}

export interface AlbumType {
    _index: 'albums',
    _id: string,
    _score: number,
    _source: {
      id: string,
      title: string,
      artist_id: string,
      tags: string[]
    }
}

export interface ArtistType {
    _index: 'artists',
    _id: string,
    _score: number,
    _source: {
      id: string,
      name: string,
      genre: string,
      tags: string[]
    }
}

export type SearchData = SongType | ArtistType | ArtistType

export interface SearchResults {
    message: string,
    data: SearchData[]
}
