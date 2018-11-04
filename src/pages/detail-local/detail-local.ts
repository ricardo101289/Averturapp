import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth-service'
/**
 * Generated class for the DetailLocalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-local',
  templateUrl: 'detail-local.html',
})
export class DetailLocalPage {
  @ViewChild('myNav') nav: NavController;
  local : any
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public authService: AuthService,
    private alertCtrl: AlertController
  ) {
    this.local = navParams.get('local')
    console.log(this.local);
    this.getComment()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailLocalPage');
  }

  publicComment(){
    this.presentPrompt()
  }

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Nuevo Comentario',
      inputs: [
        {
          name: 'comentario',
          placeholder: 'Gran atención'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'send',
          handler: data => {
            console.log(data);
            this.sendComment(data.comentario)
          }
        }
      ]
    });
    alert.present();
  }

  getComment(){
    this.authService.getComment().then(res =>{
      console.log(res);
      
    }).catch(error =>{
      console.log(error);
      
    })
  }

  sendComment(comment){

  }

}
