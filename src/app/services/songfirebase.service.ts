import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Song } from '../models/song';

@Injectable({
  providedIn: 'root'
})
export class SongfirebaseService {
private PATH : string = 'songs';

  constructor(private angularFirestore : AngularFirestore) { }

  getSong(id : string){
    return this.angularFirestore.collection(this.PATH).doc(id).valueChanges();
  };

  getSongs(){
    return this.angularFirestore.collection(this.PATH).snapshotChanges();
  };

  addSong(song : Song){
    return this.angularFirestore.collection(this.PATH).add({
      name : song.name, music : song.music, song : song.compositor,
      produtora : song.produtora, album : song.album,
      genero : song.genero, dataLanc : song.dataLanc
    });
  };

  editSong(song : Song, id : string){
    return this.angularFirestore.collection(this.PATH).doc(id).update({
      name : song.name, music : song.music, song : song.compositor,
      produtora : song.produtora, album : song.album,
      genero : song.genero, dataLanc : song.dataLanc
    });
  };

  deleteSong(song : Song){
    return this.angularFirestore.collection(this.PATH).doc(song.id).delete;
  }
}
