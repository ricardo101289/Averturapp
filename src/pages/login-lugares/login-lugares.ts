 
import {Component} from "@angular/core";
import {IonicPage,NavController, AlertController, ToastController, MenuController,LoadingController} from "ionic-angular";
 import {HomePage} from "../home/home";
import { Usuarios } from '../../providers/auth/user';
 
 import { AuthService } from '../../providers/auth/auth-service';
 import { Events } from 'ionic-angular';
import { RegistroLugaresPage } from "../registro-lugares/registro-lugares";
import { PrincipalPage } from "../principal/principal";
/**
 * Generated class for the LoginLugaresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-lugares',
  templateUrl: 'login-lugares.html',
})
export class LoginLugaresPage {
  user: Usuarios = new Usuarios();
 
 
showUser: boolean = false;
public items:any;
errorMessage: string = '';


  constructor(public nav: NavController, public forgotCtrl: AlertController, public menu: MenuController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
  public alertCtrl: AlertController,
  private authService: AuthService,
  public loadingCtrl: LoadingController,
  public events: Events
  ///public http: HttpClient,
  //public nativeStorage: NativeStorage,
   ) {
   }
 
  // go to register page
  irRegistroLugares() {
    this.nav.setRoot(RegistroLugaresPage);
  }
  
  loginLugares() {
    this.authService.signInWithEmailAndPassword(this.user)
    .then((res: any) => {
     this.popToRoot();
  }).catch((err) => {

    this.handleError(err)
  });
  }
  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Forgot Password?',
      message: "Enter your email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            let loading = this.loadingCtrl.create({
              content: 'Reseting your password...'
            });
            loading.present();
            this.authService.resetPassword(data.email)
            .then( () => {
              loading.dismiss();
              let toast = this.toastCtrl.create({
                message: 'Email was sended successfully',
                duration: 3000,
                position: 'top',
                cssClass: 'dark-trans',
                closeButtonText: 'OK',
                showCloseButton: true
              });
              toast.present();
            })
            .catch( err => {
              loading.dismiss();
              alert(err.message);
            });

          }
        }
      ]
    });
    forgot.present();
  }
 
  resetPassword() {
    this.navCtrl.push(PrincipalPage);
  }
 
  popToRoot(){
  	this.navCtrl.setPages([
		  { page: HomePage }
		]);
  }

  handleError(err){
    var toast = this.toastCtrl.create({
     duration: 3000,
      message: err,
  });
  toast.present();

  }
  

}