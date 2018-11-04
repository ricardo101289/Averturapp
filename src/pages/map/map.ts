import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, LoadingController, ModalController} from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth-service';
import { LoginPage } from '../login/login';

declare var google: any;


@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  constructor( public platform: Platform,
   private authService: AuthService,
   public navCtrl: NavController,
   public modalCtrl: ModalController
   ) {
  }

  ionViewDidLoad() {
    this.authService.getEstablishments().then(res =>{
      this.authService.Establishments = res
      console.log(this.authService.Establishments);
      
      for(let i in this.authService.Establishments){
        this.getLocal(this.authService.Establishments[i].tipo)
      }
    }).catch(error =>{
      console.log(error);
    })
  }

  getLocal(tipo){
    this.authService.getLocal(tipo).then(res =>{
      let response : any = res
      if (response.length > 0) {
        for (let i in response){
          this.authService.local.push(response[i])
        }
        console.log(this.authService.local);
        
      }
    }).catch(error =>{
      console.log("error Local: ", error);
    }
    )
  }

  editLocal(local, establecimiento){
    this.openModal(local,establecimiento, 'edit')
  }

  newLocal(){
    this.openModal("", "", 'add')
  }

  openModal(local, establecimiento, action) {
    let modal = this.modalCtrl.create('ModalLocalPage', { local: local, establecimiento: establecimiento, action : action });
    modal.present();
  }
  
}
