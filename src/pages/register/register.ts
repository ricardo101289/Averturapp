import {Component} from "@angular/core";
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import {LoginPage} from "../login/login";
 import {HomePage} from "../home/home";
 import { Usuarios } from '../../providers/auth/user';
import { AuthService } from '../../providers/auth/auth-service';
import { Config } from '../../providers/config';
import { TermsPage } from '../terms/terms';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
    usuarios: Usuarios = new Usuarios();
  mensaje:string;
    public isterms = false;


constructor(public navCtrl: NavController,public nav: NavController,
   public loadingCtrl: LoadingController, public toastCtrl: ToastController,
   private authService: AuthService,
   public config: Config
) {}

 
register(){
    if(this.isterms) {

       var toaster = this.toastCtrl.create({
           duration: 3000,
           position: 'bottom'
       });
       if (this.usuarios.email ==null || this.usuarios.password ==null || this.usuarios.nombre ==null) {
           toaster.setMessage('Todos los campos son obligatorios');
           toaster.present();
       } else if (this.usuarios.password.length < 7) {
           toaster.setMessage('Contraceña muy corta,debe tener mas de 6 caracteres');
           toaster.present();
       } else {    
        if(this.usuarios.perfilURL==null){
            this.usuarios.perfilURL='https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1';   
        } 
       this.authService.createUserWithEmailAndPassword(this.usuarios)
           //    .then(r => this.popToRoot()).catch(this.handleError);
           .then((res: any) => {
               this.popToRoot();
            }).catch((err) => {
              
              this.handleError(err)
            });
         
   }
}else{
    this.mensaje="Debes aceptar los terminos de uso"
    this.handleError(this.mensaje)

}

}
 

   popToRoot(){
       let loader = this.loadingCtrl.create({
           duration: 1000,
           content: 'Por Favor Espere...'
           });
           loader.present();
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
 // go to login page
 irLogin() {
   this.navCtrl.setRoot(LoginPage);
 }

 goTerms() {
    this.navCtrl.push(TermsPage, null, this.config.navOptions);
}
clickTerm() {
    if(this.isterms) {
        this.goTerms();
    }
}
}
