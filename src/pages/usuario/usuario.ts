import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Usuarios } from '../../providers/auth/user';
import { AuthService } from '../../providers/auth/auth-service';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage {
 
list : AngularFireList<any>;

  datos: Observable<Usuarios[]>;
  public movi   : any;

  constructor(public navCtrl: NavController,
    private authService: AuthService,
   
    private angularFireAuth: AngularFireAuth,

  ) { 
    this.usuarioCurren();
  }
 
  usuarioCurren(){
  this.movi= this.authService.getUsuario();
  }

  
  public signOut() {
    this.authService.signOut()
      .then(() => {
        this.navCtrl.setRoot(LoginPage);
      })
      .catch((error) => {
        console.error(error);
      });
  }//parent.parent.
}