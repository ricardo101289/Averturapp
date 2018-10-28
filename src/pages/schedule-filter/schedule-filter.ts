import { Component,ViewChild } from '@angular/core';
import { AlertController, App, FabContainer, ItemSliding, List, ModalController, NavController, ToastController, LoadingController, Refresher } from 'ionic-angular';

import { NavParams, ViewController } from 'ionic-angular';
import {EstudianteService} from "../../providers/auth/estudiante.service";

 
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { EstablecimientosPage } from '../establecimientos/establecimientos';
import { Ciudades } from '../../providers/auth/ciudades';
 
@Component({
  selector: 'page-schedule-filter',
  templateUrl: 'schedule-filter.html'
})
export class ScheduleFilterPage {
  tracks: Array<{name: string, isChecked: boolean}> = [];
  public movies   : any;
  public ciudades : Ciudades = new Ciudades();
  //targetas: Targetas= new  Targetas();

  //  public ciudades={id:null,foto:null,
    // nombre :null,
  // }
   ciudad: Observable<any>;

  //note = {id: null, title: null, description: null};

  itemList: any[];

  datos: Observable<any>;
 public sumaIndustrial:any;

 @ViewChild('myNav') nav: NavController;

  constructor(
   
     public viewCtrl: ViewController,
    public params         : NavParams,
    public navCtrl: NavController,
    private db: AngularFireDatabase,
    public modalCtrl: ModalController,

    public estudianteService: EstudianteService) {
     
  
         let movie 		    = params.get('movie'),
             k;
 
         this.ciudades.nombre	= movie.nombre;
         this.ciudades.foto   	= movie.foto;
         this.ciudades.id   	= movie.id;
       
      console.log('nnn'+this.ciudades.id)
 
          this.datos= this.getEstablecimientos();

   
  }
  
  /*public getPromedios(){
    
    this.ciudad.subscribe(ciudades => {this.itemList = ciudades;
   
 
        this.sumaIndustrial= parseFloat(ciudades);
     console.log('000'+this.sumaIndustrial);
        
      });
      console.log()
    }
*/
 
editMovie(movie)
  {

     let params = { movie: movie },
         modal  = this.modalCtrl.create(EstablecimientosPage, params);

    
     modal.present();
  }
 
getEstablecimientos() :Observable<any>{
  return new Observable(observer =>
    { 
      firebase.database().ref('/AdventureApp/Ciudades').child(this.ciudades.nombre).child('/Establecimientos')
      .once('value', (items : any) =>
    
      {
      let user:any=[];
   
         items.forEach((item) =>
         {
           user.push({
            tipo   :item.val().tipo,
             fotoBal     : item.val().fotoBal,
          });
        
         });
   
         observer.next(user);
         observer.complete();
      },
      (error) =>
      {
         console.log("Observer error: ", error);
         console.dir(error);
         observer.error(error)
      });
   
   });

}
   
 

}
