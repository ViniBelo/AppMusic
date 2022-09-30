import { Injectable } from '@angular/core';
import { Song } from '../models/song';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  private _songs: Song[] = [];

  constructor() { 
    let song = new Song("Vitao", "Rap do Xarquinho", "teste", "teste", "teste", "teste", "2002-01-07");
    this.inserir(song);

  }

  public get songs(): Song[] {
    return this._songs;
  }

  public inserir(song: Song) {
    this._songs.push(song);
  }

  public editar(song: Song, name: string, music: string, compositor: string, produtora : string, album: string, genero : string, dataLanc: string): boolean{
    for(let i = 0; i < this._songs.length; i ++) {
      if(this._songs[i].id == song.id) {
        this._songs[i].name = name;
        this._songs[i].music = music;
        this._songs[i].compositor = compositor;
        this._songs[i].produtora = produtora;
        this._songs[i].album = album;
        this._songs[i].genero = genero;
        this._songs[i].dataLanc = dataLanc;
        return true;
      }
    }
    return false;
  }

  public excluir(song: Song): boolean {
    for(let i = 0; i < this.songs.length; i++) {
      if(this._songs[i].id == song.id) {
        this.songs.splice(i, 1);
        return true;
      }
    }
    return false;
  }
}
