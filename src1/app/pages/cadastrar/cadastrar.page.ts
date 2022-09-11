import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { SongsService } from 'src/app/services/songs.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})

export class CadastrarPage implements OnInit {
  data : string
  form_add : FormGroup
  isSubmitted : boolean = false

  constructor(private alertController: AlertController, 
    private router: Router, 
    private songsService : SongsService, 
    private formBuilder : FormBuilder) { }

  ngOnInit() {
    this.data = new Date().toISOString();
    this.form_add = this.formBuilder.group({
      name : ["",[Validators.required]],
      music : ["", [Validators.required]],
      compositor : ["", [Validators.required]],
      produtora : ["", [Validators.required]],
      album : ["", [Validators.required]],
      genero : ["", [Validators.required]],
      dataLanc : ["", [Validators.required]] 
    });
  }

  get errorControl(){
    return this.form_add.controls
  }

  submitForm() : boolean{
    this.isSubmitted = true;
    if(!this.form_add.valid){
      this.presentAlert("Music","Error","All fields are required");
      return false;
    }else{
      this.cadastrar();
    }
  }

  private cadastrar(){
    this.songsService.inserir(this.form_add.value);
    this.presentAlert("Music", "Success", "Song Added");
    this.router.navigate(['/home']);
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

}
