import { Injectable } from '@angular/core';
import { Song } from '../models/song';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  private _songs: Song[] = []

  constructor() {  }

  public get songs(): Song[] {
    return this._songs
  }

  public inserir(song: Song) {
    this._songs.push(song)
  }

  public editar(song: Song, nome: string, artist: string, album: string, launchDate: string): boolean{
    for(let i = 0; i < this._songs.length; i ++) {
      if(this._songs[i].id == song.id) {
        this._songs[i].nome = nome
        this._songs[i].artist = artist
        this._songs[i].album = album
        this._songs[i].launchDate = launchDate
        return true
      }
    }
    return false
  }

  public excluir(song: Song): boolean {
    for(let i = 0; i < this._songs.length; i++) {
      if(this._songs[i].id == song.id) {
        this._songs.splice(i, 1)
        return true
      }
    }
    return false
  }
}
