import { Component, ViewChild } from '@angular/core';
import { AlertController, App, FabContainer, ItemSliding, List, ModalController, NavController, ToastController, LoadingController, Refresher } from 'ionic-angular';
import { NavParams, ViewController } from 'ionic-angular';
import { EstudianteService } from "../../providers/auth/estudiante.service";
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { EstablecimientosPage } from '../establecimientos/establecimientos';
import { Ciudades } from '../../providers/auth/ciudades';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { AuthService } from '../../providers/auth/auth-service'
@Component({
  selector: 'page-schedule-filter',
  templateUrl: 'schedule-filter.html'
})
export class ScheduleFilterPage {
  tracks: Array<{ name: string, isChecked: boolean }> = [];
  public movies: any;
  public ciudades: Ciudades = new Ciudades();
  itemList: any[];
  public sumaIndustrial: any;
  city
  @ViewChild('myNav') nav: NavController;

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public navCtrl: NavController,
    private db: AngularFireDatabase,
    public modalCtrl: ModalController,
    public estudianteService: EstudianteService,
    public authService: AuthService,
    private _sanitizer: DomSanitizer
  ) {
    this.city = navParams.get('city')
  }

  /*public getPromedios(){
    
    this.ciudad.subscribe(ciudades => {this.itemList = ciudades;
   
 
        this.sumaIndustrial= parseFloat(ciudades);
     console.log('000'+this.sumaIndustrial);
        
      });
      console.log()
    }
*/
  goEstablishments(category) {
      this.modalCtrl.create(EstablecimientosPage, { city : this.city, category: category }).present();
  }


  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }

}
