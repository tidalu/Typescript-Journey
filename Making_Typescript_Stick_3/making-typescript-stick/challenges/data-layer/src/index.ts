export interface DataEntity {
  id: string
}
export interface Movie extends DataEntity {
  director: string
}
export interface Song extends DataEntity {
  singer: string
}
 
export type DataEntityMap = {
  movie: Movie
  song: Song
}
 type DataStoreMethods = {
    [K in keyof DataEntityMap as `getAll${Capitalize<K>}s`]: () => DataEntityMap[K][];
 } & {
    [K in keyof DataEntityMap as `get${Capitalize<K>}`]: (id :string) => DataEntityMap[K]
 }
  & {
    [K in keyof DataEntityMap as `add${Capitalize<K>}`]: (id : DataEntityMap[K]) => void
 }
  & {
    [K in keyof DataEntityMap as `clear${Capitalize<K>}s`]: () => void
 }
 

 function isDefined<T>(x: T | undefined): x is T {
    return typeof x !== 'undefined'
 }

export class DataStore implements DataStoreMethods{
    #data: { [ K in keyof DataEntityMap]: Record<string, DataEntityMap[K]>} = {
        movie: {}, 
        song: {
        }
    }
    getAllSongs(): Song[] {
        return Object.keys(this.#data.song).map((songKey) =>  this.#data.song[songKey]).filter(isDefined)
    }
    getSong(songKey: string): Song {
        const song = this.#data.song[songKey]
        if(!song) throw new Error('could not find the song with the given key')
        return song 
    }
     addSong(song: Song): Song {
      this.#data.song[song.id] = song
        return song
    }
    clearSongs(): void {
        this.#data.song = {}
    }
    
    getAllMovies(): Movie[] {
        return Object.keys(this.#data.movie).map((movieKey) =>  this.#data.movie[movieKey]).filter(isDefined)
    }
    getMovie(movieKey : string): Movie {
        const movie = this.#data.movie[movieKey]
        if(!movie) throw new Error('could not find the movie with the given key')
        return movie
    }
  addMovie(movie: Movie): Movie {
      this.#data.movie[movie.id] = movie
        return movie
    }
    clearMovies(): void {
        this.#data.movie = {}
    }
    
}

