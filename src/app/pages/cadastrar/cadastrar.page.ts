import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AlertController, LoadingController } from '@ionic/angular'
import { SongFirebaseService } from 'src/app/services/song-firebase.service'

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})

export class CadastrarPage implements OnInit {
  data : string
  form_add : FormGroup
  isSubmitted : boolean = false
  image: any

  constructor(private alertController: AlertController, 
    private router: Router, 
    private songFS : SongFirebaseService, 
    private formBuilder : FormBuilder,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.data = new Date().toISOString()
    this.form_add = this.formBuilder.group({
      name : ['',[Validators.required]],
      music : ['', [Validators.required]],
      compositor : ['', [Validators.required]],
      produtora : ['', [Validators.required]],
      album : ['', [Validators.required]],
      genero : ['', [Validators.required]],
      dataLanc : ['', [Validators.required]],
      image: ['', [Validators.required]]
    })
  }

  uploadFile(image: any) {
    this.image = image.files
  }

  get errorControl(){
    return this.form_add.controls
  }

  submitForm() : boolean{
    this.isSubmitted = true
    if(!this.form_add.valid){
      this.presentAlert('Music','Error','All fields are required')
      return false
    }else{
      this.cadastrar()
    }
  }

  private cadastrar(){
    this.showLoading('Wait a moment', 10000)
    this.songFS.sendImage(this.image,
      this.form_add.value)
      .then(() => {
        this.loadingCtrl.dismiss()
        this.presentAlert('Music', 'SUCCESS!', 'Song Added!')
        this.router.navigate(['/home'])
      })
      .catch((error) => {
        this.loadingCtrl.dismiss()
        this.presentAlert('Music', 'ERROR!', 'Error Adding Song!')
        this.router.navigate(['/home'])
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

  async showLoading(message: string, duration: number) {
    const loading = await this.loadingCtrl.create({
      message: message,
      duration: duration
    })

    loading.present()
  }
}
