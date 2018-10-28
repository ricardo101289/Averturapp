import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';


 
import { Platform } from 'ionic-angular';

import { AuthService } from '../../providers/auth/auth-service';
import { LoginPage } from '../login/login';

declare var google: any;


@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('mapCanvas') mapElement: ElementRef;
  constructor( public platform: Platform,
   private authService: AuthService,
   public navCtrl: NavController
   ) {
  }

  ionViewDidLoad() {

    
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
