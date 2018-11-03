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
  Establishments : any
  local : any = []
  constructor( public platform: Platform,
   private authService: AuthService,
   public navCtrl: NavController,
   public modalCtrl: ModalController
   ) {
  }

  ionViewDidLoad() {
    this.authService.getEstablishments().then(res =>{
      this.Establishments = res
      for(let i in this.Establishments){
        this.getLocal(this.Establishments[i].tipo)
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
          this.local.push(response[i])
        }
        console.log(this.local);
        
      }
    }).catch(error =>{
      console.log("error Local: ", error);
    }
    )
  }

  editLocal(local, establecimiento){
    console.log(local);
    console.log(establecimiento);
    this.openModal(local,establecimiento)
  }

  openModal(local, establecimiento) {
    let modal = this.modalCtrl.create('ModalLocalPage', { local: local, establecimiento: establecimiento });
    modal.present();
  }

/*  public signOut() {
    this.authService.signOut()
      .then(() => {
        this.navCtrl.setRoot(LoginPage);
      })
      .catch((error) => {
        console.error(error);
      });
  }//parent.parent.*/
}
