import { Component } from "@angular/core";
import { NavController, AlertController, ToastController, MenuController, LoadingController } from "ionic-angular";
import { HomePage } from "../home/home";
import { RegisterPage } from "../register/register";
import { Usuarios } from '../../providers/auth/user';
import { AuthService } from '../../providers/auth/auth-service';
import { Events } from 'ionic-angular';
import { ForgotPasswordPage } from "../forgot-password/forgot-password";
import { PrincipalPage } from "../principal/principal";
import { Facebook } from '@ionic-native/facebook';
import * as firebase from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  user: Usuarios = new Usuarios();
  showUser: boolean = false;
  public items: any;
  errorMessage: string = '';

  constructor(
    public nav: NavController,
    public forgotCtrl: AlertController,
    public menu: MenuController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private authService: AuthService,
    public loadingCtrl: LoadingController,
    public events: Events,
    private facebook: Facebook,
    private googlePlus: GooglePlus
  ) {
  }

  // go to register page
  irRegister() {
    this.nav.setRoot(RegisterPage);
  }

  login() {
    this.authService.signInWithEmailAndPassword(this.user).then(res => {
      console.log(res);
      this.popToRoot();
    }).catch((error) => {
      this.handleError(error)
    });
  }

  signInWithFacebook() {

    // this.fb.login(['public_profile', 'user_friends', 'email'])
    //   .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
    //   .catch(e => console.log('Error logging into Facebook', e))





    console.log("call login to facebook");
    
    this.authService.signInWithFacebook()
      .then(res =>{
        console.log("login desde login");
        
        console.log(res);
        this.popToRoot();
        
      })
      .catch((error) => {
        this.handleError(error);

      });
  }

  // signInWithFacebook(): Promise<any> {
  //   return this.facebook.login(['email'])
  //     .then( response => {
  //       const facebookCredential = firebase.auth.FacebookAuthProvider
  //         .credential(response.authResponse.accessToken);
  
  //       firebase.auth().signInWithCredential(facebookCredential)
  //         .then( success => { 
  //           console.log("Firebase success: " + success); 
  //         });
  
  //     }).catch((error) => { console.log(error) });
  // }

  LoginnWithGoogle() {
    console.log("call to login googl");
    this.authService.nativeGoogleLogin()
      .then(res => {
        console.log("respuesta96 login");
        
        console.log(res);
        
        this.popToRoot();
      })
      .catch((error) => {
        console.log(error);

        this.handleError(error);
        //  this.toastCtrl.create({ duration: 3000, position: 'bottom', message: error })
        //  .present();
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
              .then(() => {
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
              .catch(err => {
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
    //this.authService.resetPassword()
    /*  let forgot = this.forgotCtrl.create({
        title: '¿Recuperar Contraceña?',
        message: "Ingrese su Email para enviarle un enlace para restablecer su contraseña.",
      inputs: [
          {
            name: 'email',
            placeholder: 'Email',
            type: 'email'
          },
        ],
        buttons: [
          {
            text: 'Cancelar',
            handler: data => {
              console.log('Cancelar clicked');
            }
          },
          {
            text: 'Enviar',
            handler: data => {
              console.log('Enviar clicked');
              let toast = this.toastCtrl.create({
                message: 'Email Enviado Exitosamente',
                duration: 3000,
                position: 'top',
                cssClass: 'dark-trans',
                closeButtonText: 'OK',
                showCloseButton: true
              });
              toast.present();
            }
          }
        ]
      });
      forgot.present();*/
  }

  popToRoot() {
    this.navCtrl.setPages([
      { page: HomePage }
    ]);
  }

  handleError(err) {
    var toast = this.toastCtrl.create({
      duration: 3000,
      message: err,
    });
    toast.present();

  }


}
