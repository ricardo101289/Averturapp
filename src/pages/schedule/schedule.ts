import { Component, ViewChild } from '@angular/core';

import { AlertController, App,  List, ModalController, NavController, ToastController, LoadingController, Refresher } from 'ionic-angular';

/*
  To learn how to use third party libs in an
  Ionic app check out our docs here: http://ionicframework.com/docs/v2/resources/third-party-libs/
*/
// import moment from 'moment';
 

import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { Observable } from 'rxjs/Observable';
import { EstudianteService } from '../../providers/auth/estudiante.service';
 

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {
 
  @ViewChild('scheduleList', { read: List }) scheduleList: List;

 
  itemList: any[];
 
  ciudad: Observable<any>;
 public sumaIndustrial:any;

 @ViewChild('myNav') nav: NavController;

  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    private estudianteService: EstudianteService
 
  ) {
    this.ciudad= this.estudianteService
    .getCiudades()
    .snapshotChanges()
    .map(changes =>{
        return changes.map(c =>({
          key:c.payload.key,
          ...c.payload.val(),
        }));
        });
        console.log(this.ciudad);
        
        
        }
        
   
 
  editMovi(movie)
  {
     let params = { movie: movie },
     modal  = this.modalCtrl.create(ScheduleFilterPage, params);

     modal.present();
  }
  
  
}
