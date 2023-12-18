export interface SongSearchResult {
    _index: string,
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
    },
}


export interface ArtistAlbumSearchResult {
    title: string,
    artist_id: string,
    id: string,
}
