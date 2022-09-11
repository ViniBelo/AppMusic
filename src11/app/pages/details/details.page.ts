import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Song } from 'src/app/models/song';
import { SongsService } from 'src/app/services/songs.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  song : Song;
  form_edit : FormGroup;
  isSubmitted : boolean = false;
  data : string;
  edition : boolean = true;
  constructor(private router : Router, private alertController : AlertController, private songsService : SongsService, private formBuilder : FormBuilder) { }

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    this.song = nav.extras.state.objeto;
    this.data = new Date().toISOString();
    this.form_edit = this.formBuilder.group({
      name : [this.song.name,[Validators.required]],
      music : [this.song.music, [Validators.required]],
      album : [this.song.album, [Validators.required]],
      genero : [this.song.genero, [Validators.required]],
      dataLanc : [this.song.dataLanc, [Validators.required]] 
    })
  }

  get errorControl(){
    return this.form_edit.controls;
  }

  submitForm():boolean{
    this.isSubmitted = true;
    if(!this.form_edit.valid){
      this.presentAlert("Music", "Error", "All fields are required!");
      return false;
    }else{
      this.edit();
    }
  }

  toggleEdition(){
    if(this.edition == true){
      this.edition = false;
    }else{
      this.edition = true;
    }
  }

  edit(){
    this.songsService.editar(this.song, this.form_edit.value['name'], this.form_edit.value['music'], this.form_edit.value['album'], this.form_edit.value['genero'], this.form_edit.value['dataLanc'])
    this.presentAlert("Music", "Sucess", "Song edited");
    this.router.navigate(['/home']);
  }

  delete(){
    this.presentAlertConfirm("Music", "Delete song", "Do you really want to delete the song?");
  }

  private deleteSong(song : Song){
    if(this.songsService.excluir(this.song)){
      this.presentAlert("Music", "Sucess", "Song deleted");
      this.router.navigate(['/home']);
    }else{
      this.presentAlert("Music", "Error", "Song not found");
    }
  }

  async presentAlert(header : string, subHeader : string, message : string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
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
            this.deleteSong(this.song);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

}
