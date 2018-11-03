import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth-service';
/**
 * Generated class for the ModalLocalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-local',
  templateUrl: 'modal-local.html',
})
export class ModalLocalPage {
  local : any
  establecimiento : any
  loader : any
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private authService: AuthService,
    public loadingCtrl: LoadingController) {
    this.local = navParams.get('local')
    this.establecimiento = navParams.get('establecimiento')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalLocalPage');
    console.log(this.local, this.establecimiento);
    
  }

  editLocal(local){
    this.presentLoading("Actualizando registro...")
    this.authService.updateLocal(local).then(res =>{
      this.hideLoading()
      this.dismiss();
    }).catch(error=>{
      console.log(error);
      
    })
  }

  presentLoading(text) {
    this.loader = this.loadingCtrl.create({
      content: text,
    });
    this.loader.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  hideLoading(){
    this.loader.dismiss();
  }

}
