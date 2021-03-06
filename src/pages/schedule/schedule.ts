import { Component, ViewChild } from '@angular/core';
import { CitiesProvider } from '../../providers/cities/cities'
import { AlertController, App, List, ModalController, NavController, ToastController, LoadingController, Refresher } from 'ionic-angular';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { EstudianteService } from '../../providers/auth/estudiante.service';
import { AuthService } from '../../providers/auth/auth-service'

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {
  @ViewChild('scheduleList', { read: List }) scheduleList: List;
  itemList: any[];
  relationship = "normal"
  ciudad: any
  indice = 1
  public sumaIndustrial: any;

  @ViewChild('myNav') nav: NavController;
  loader: any
  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    private estudianteService: EstudianteService,
    public cities: CitiesProvider,
    public authService: AuthService
  ) {
    this.presentLoading("cargando Ciudades...")
    this.getCities()
  }

  getCities() {
    this.cities.getCities_1().then(res => {
      this.ciudad = res
      this.hideLoading()
    }).catch(error => {
      this.hideLoading()
      console.log(error);
    })
  }

  openCategories(city){
    this.authService.getEstablishments().then(res =>{
      this.authService.Establishments = res
      this.modalCtrl.create(ScheduleFilterPage, { city : city}).present();
    }).catch(error =>{
      console.log(error);
    })
  }

  segmentChanged(value) {
    this.relationship = value
    this.ciudad = this.ciudad
  }

  presentLoading(text) {
    this.loader = this.loadingCtrl.create({
      content: text,
    });
    this.loader.present();
  }

  hideLoading() {
    this.loader.dismiss();
  }

}
