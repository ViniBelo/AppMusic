import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { stringLength } from '@firebase/util'
import { AlertController, LoadingController } from '@ionic/angular'
import { Song } from 'src/app/models/song'
import { SongFirebaseService } from 'src/app/services/song-firebase.service'

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  song : Song
  form_edit : FormGroup
  isSubmitted : boolean = false
  data : string
  edition : boolean = true
  image: any

  constructor(private router : Router,
    private alertController : AlertController,
    private songFS : SongFirebaseService,
    private formBuilder : FormBuilder,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    const nav = this.router.getCurrentNavigation()
    this.song = nav.extras.state.objeto
    this.data = new Date().toISOString()
    this.form_edit = this.formBuilder.group({
      name : [this.song.name,[Validators.required]],
      music : [this.song.music, [Validators.required]],
      compositor : [this.song.compositor, [Validators.required]],
      produtora : [this.song.produtora, [Validators.required]],
      album : [this.song.album, [Validators.required]],
      genero : [this.song.genero, [Validators.required]],
      dataLanc : [this.song.dataLanc, [Validators.required]]
    })
  }

  uploadFile(image: any) {
    this.image = image.files
  }

  get errorControl(){
    return this.form_edit.controls
  }

  submitForm():boolean{
    this.isSubmitted = true
    if(!this.form_edit.valid){
      this.presentAlert("Music", "Error", "All fields are required!")
      return false
    }else{
      this.edit()
    }
  }

  toggleEdition(){
    if(this.edition == true){
      this.edition = false
    }else{
      this.edition = true
    }
  }

  edit(){
    this.showLoading('Wait a moment', 10000)

    if(this.image) {
      this.songFS.editImage(this.image,
        this.form_edit.value,
        this.song.id)
        .then(() => {
          this.songFS.deleteImage(this.song.downloadURL)
          this.loadingCtrl.dismiss()
          this.presentAlert("Music", "SUCCESS", "Song edited!")
          this.router.navigate(['/home'])
        })
        .catch((error) => {
          this.loadingCtrl.dismiss()
          this.presentAlert("Music", "ERROR!", "Error editing song!")
          this.router.navigate(['/home'])
          console.error(error)
        })
    } else {
      this.songFS.editSong(this.form_edit.value,
        this.song.id)
        .then(() => {
          this.loadingCtrl.dismiss()
          this.presentAlert("Music", "SUCCESS", "Song edited!")
          this.router.navigate(['/home'])
        })
        .catch((error) => {
          this.loadingCtrl.dismiss()
          this.presentAlert("Music", "ERROR!", "Error editing song!")
          this.router.navigate(['/home'])
          console.error(error)
        })
    }
  }

  delete(){
    this.presentAlertConfirm("Music", "Delete song", "Do you really want to delete the song?")
  }

  private deleteSong(song : Song){
    this.songFS.deleteSong(song)
    .then(() => {
      this.presentAlert('Music', 'Delete', 'Exclusion realized!')
      this.router.navigate(['/home'])
    })
    .catch((error) => {
      this.presentAlert('Music', 'Delete', 'Song does not found!')
      console.error(error)
    })
  }

  async presentAlert(header : string, subHeader : string, message : string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    })

    await alert.present()
  }

  async presentAlertConfirm(header : string, subHeader : string, message : string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.deleteSong(this.song)
          },
        },
      ],
    })

    await alert.present()
  }

  async showLoading(message: string, duration: number) {
    const loading = await this.loadingCtrl.create({
      message: message,
      duration: duration
    })

    loading.present()
  }
}
