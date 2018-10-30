import { Component } from '@angular/core';
import { IonicPage, NavController,MenuController } from 'ionic-angular';
import{PrincipalPage} from '../principal/principal'

/**
 * Generated class for the SlidersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export interface Slide {
  title: string;
  description: string;
  image: string;
}
@IonicPage()
@Component({
  selector: 'page-sliders',
  templateUrl: 'sliders.html',
})
export class SlidersPage {

  slides: Slide[];
  showSkip = true;

  constructor(public navCtrl: NavController, public menu: MenuController//, public storage: Storage
  ) {
    this.slides = [
      {
        title: 'Bienvenido <b>AdventurApp</b>',
        description: 'Encuentra tus lugares favoritos.',
        image: 'assets/img/slide1.png',
      },
      {
        title: 'Publica Tu Negocio',
        description: 'Ubica tu dirección nosotros la publicamos por ti',
        image: 'assets/img/slide2.png',
      },
      {
        title: 'Califica los Lugares que Visitas',
        description: 'Cuentale a los viajeares tus experiencias en los lugares que visitas',
        image: 'assets/img/slider3.png',
      }
    ];
  }

  startApp() {
    this.navCtrl.push(PrincipalPage);
   // this.storage.set('hasSeenTutorial', 'true');
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }
  skip() {
    this.navCtrl.push(PrincipalPage);
  }
}
