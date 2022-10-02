import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { AngularFireStorage, fromTask } from '@angular/fire/compat/storage'
import { Song } from '../models/song'
import { finalize } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class SongFirebaseService {
  private PATH : string = 'songs'

  constructor(private angularFirestore : AngularFirestore,
    private angularFireStorage: AngularFireStorage) { }

  getSong(id : string){
    return this.angularFirestore.collection(this.PATH).doc(id).valueChanges()
  }

  getSongs(){
    return this.angularFirestore.collection(this.PATH).snapshotChanges()
  }

  deleteImage(downloadURL: any) {
    return this.angularFireStorage.storage.refFromURL(downloadURL).delete()
  }

  updateImage(song: Song, id: string) {
    return this.angularFirestore.collection(this.PATH).doc(id).update({
      downloadURL: song.downloadURL
    })
  }

  editImage(image: any, song: Song, id: string) {
    const file = image.item(0)
    if(file.type.split('/')[0] !== 'image') {
      console.error('Type file is not supported!')
      return
    }
    const path = `images/${new Date().getTime()}_${file.name}`
    const fileRef = this.angularFireStorage.ref(path)
    let task = this.angularFireStorage.upload(path, file)
    task.snapshotChanges().pipe(
      finalize(() => {
        let uploadedFile = fileRef.getDownloadURL()
        uploadedFile.subscribe(resp => {
          song.downloadURL = resp
          this.editSong(song, id)
          this.updateImage(song, id)
        })
      })
    ).subscribe()
    return task
  }

  sendImage(image: any, song: Song) {
    const file = image.item(0)
    if(file.type.split('/')[0] !== 'image') {
      console.error('Type file is not supported!')
      return
    }
    const path = `images/${new Date().getTime()}_${file.name}`
    const fileRef = this.angularFireStorage.ref(path)
    let task = this.angularFireStorage.upload(path, file)
    task.snapshotChanges().pipe(
      finalize(() => {
        let uploadedFile = fileRef.getDownloadURL()
        uploadedFile.subscribe(resp => {
          song.downloadURL = resp
          this.addSong(song)
        })
      })
    ).subscribe()
    return task
  }

  addSong(song : Song){
    return this.angularFirestore.collection(this.PATH).add({
      name : song.name,
      music : song.music,
      compositor : song.compositor,
      produtora : song.produtora,
      album : song.album,
      genero : song.genero,
      dataLanc : song.dataLanc,
      downloadURL: song.downloadURL
    })
  }

  editSong(song : Song, id : string){
    return this.angularFirestore.collection(this.PATH).doc(id).update({
      name : song.name,
      music : song.music,
      song : song.compositor,
      produtora : song.produtora,
      album : song.album,
      genero : song.genero,
      dataLanc : song.dataLanc
    })
  }

  deleteSong(song : Song){
    this.deleteImage(song.downloadURL)
    return this.angularFirestore.collection(this.PATH).doc(song.id).delete()
  }
}
