import { Injectable } from '@angular/core';
import { Song } from '../models/song';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  private _songs: Song[] = []

  constructor() { }
}
