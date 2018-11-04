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
@Component({
  selector: 'page-schedule-filter',
  templateUrl: 'schedule-filter.html'
})
export class ScheduleFilterPage {
  tracks: Array<{ name: string, isChecked: boolean }> = [];
  public movies: any;
  public ciudades: Ciudades = new Ciudades();
  ciudad: Observable<any>;
  itemList: any[];
  datos: Observable<any>;
  public sumaIndustrial: any;

  @ViewChild('myNav') nav: NavController;

  constructor(
    public viewCtrl: ViewController,
    public params: NavParams,
    public navCtrl: NavController,
    private db: AngularFireDatabase,
    public modalCtrl: ModalController,
    public estudianteService: EstudianteService,
    private _sanitizer: DomSanitizer
  ) {
    this.datos = this.getEstablecimientos(params.get('city'));
  }

  /*public getPromedios(){
    
    this.ciudad.subscribe(ciudades => {this.itemList = ciudades;
   
 
        this.sumaIndustrial= parseFloat(ciudades);
     console.log('000'+this.sumaIndustrial);
        
      });
      console.log()
    }
*/
  editMovie(movie) {
    let params = { movie: movie },
      modal = this.modalCtrl.create(EstablecimientosPage, params);
    modal.present();
  }

  getEstablecimientos(city): Observable<any> {
    return new Observable(observer => {
      firebase.database().ref('/AdventureApp/Ciudades').child(city).child('/Establecimientos')
        .once('value', (items: any) => {
          let user: any = [];
          items.forEach((item) => {
            user.push({
              tipo: item.val().tipo,
              fotoBal: item.val().fotoBal,
            });

          });
          console.log(user);

          observer.next(user);
          observer.complete();
        },
          (error) => {
            console.log("Observer error: ", error);
            console.dir(error);
            observer.error(error)
          });
    });
  }

  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }

}
