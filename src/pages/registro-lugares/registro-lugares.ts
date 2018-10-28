import {Component} from "@angular/core";
import { IonicPage,NavController, LoadingController, ToastController } from 'ionic-angular';
 import {HomePage} from "../home/home";
 import { Usuarios } from '../../providers/auth/user';
import { AuthService } from '../../providers/auth/auth-service';
import { LoginLugaresPage } from "../login-lugares/login-lugares";
import { Config } from '../../providers/config';
import { TermsPage } from '../terms/terms';
import { EstudianteService } from '../../providers/auth/estudiante.service';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the RegistroLugaresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-registro-lugares',
  templateUrl: 'registro-lugares.html',
})
export class RegistroLugaresPage {
  usuarios: Usuarios = new Usuarios();
  public isterms = false;
  categorias$: Observable<any[]>;
  ciudades$: Observable<any[]>;
  mensaje:string;
  
  constructor(public navCtrl: NavController,public nav: NavController,
     public loadingCtrl: LoadingController, public toastCtrl: ToastController,
     private authService: AuthService,
     private estudianteService: EstudianteService,
   public config: Config
) {
    this.ciudades$= this.getCiudades();
    /* this.datos$= this.estudianteService
    .getCategorias()
    .snapshotChanges()
    .map(changes =>{
        return changes.map(c =>({
          key:c.payload.key,
          ...c.payload.val(),
        }));
        }); 
*/
  this.categorias$=this.getCategorias();
   
}
getCategorias () :Observable<any>
{
return new Observable(observer =>
 {
    firebase.database().ref('/AdventureApp/Categorias/').once('value', (items : any) =>
   {
   let user:any=[];
      items.forEach((item) =>
      {
        user.push({
         nombre   :item.val().nombre,
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

getCiudades () :Observable<any>
{
return new Observable(observer =>
 {
    firebase.database().ref('/AdventureApp/Ciudades_1/').once('value', (items : any) =>
   {
   let user:any=[];
      items.forEach((item) =>
      {
        user.push({
         nombre   :item.val().nombre,
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
   
  
  registerLugares(){
    if(this.isterms) {

      var toaster = this.toastCtrl.create({
          duration: 3000,
          position: 'bottom'
      });
      if (this.usuarios.nit ==null || this.usuarios.nombre ==null || this.usuarios.tipo_servicio ==null
          || this.usuarios.direccion ==null || this.usuarios.email ==null || this.usuarios.password ==null
      ) {
          toaster.setMessage('Todos los campos son obligatorios');
          toaster.present();
      } else if (this.usuarios.password.length < 7) {
          toaster.setMessage('Contraceña muy corta,debe tener mas de 6 caracteres');
          toaster.present();
      } else { 
        if(this.usuarios.perfilURL==null){
            this.usuarios.perfilURL='https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1';   
        }
            this.authService.createUserWithEmailAndPasswordLugares(this.usuarios)
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
   irLoginLugares() {
     this.navCtrl.setRoot(LoginLugaresPage);
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
  