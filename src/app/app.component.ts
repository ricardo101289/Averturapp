import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../providers/auth/auth-service';
import { NavController } from 'ionic-angular';
import { UsuarioPage } from '../pages/usuario/usuario';
import { SlidersPage } from '../pages/sliders/sliders';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import {CitiesProvider} from '../providers/cities/cities'

import { AngularFireAuth } from 'angularfire2/auth';
import { MapPage } from '../pages/map/map';
import { AboutPage } from '../pages/about/about';
export interface MenuItem {
  title: string;
  component: any;
  icon: string;
}
@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  public movi: any;
  public navCtrl: NavController
  appMenuItems = [
    { title: 'Home', component: HomePage, icon: 'home' },
    { title: 'Places', component: MapPage, icon: 'md-globe' },
    { title: 'mi ubicacion', component: MapPage, icon: 'logo-rss' },
    { title: 'Cotact', component: AboutPage, icon: 'md-mail' },
    { title: 'About', component: AboutPage, icon: 'information-circle' },
  ];
  appMenuItems2 = [
    { title: 'Account', component: UsuarioPage, icon: 'person' },
  ];
  
  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public afAuth: AngularFireAuth,
    private authService: AuthService,
    public cities : CitiesProvider
  ) {
    afAuth.authState.subscribe(user => {
      if (user) {
        this.rootPage = HomePage;
        this.usuarioCurren();
      } else {
        this.rootPage = SlidersPage;// PrincipalPage;//
      }
    });
    this.getCities()
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  getCities(){
    this.cities.getCities().then(res =>{
      this.cities.cities = res
      this.getCategorys()
    }).catch(error =>{
      error
    })
  }

  getCategorys(){
    this.cities.getCategorys().then(res =>{
      this.cities.categorys = res
    }).catch(error =>{
      error
    })
  }

  openPage(appMenuItems) {
    this.nav.setRoot(appMenuItems.component);
  }
  public signOut() {
    this.authService.signOut()
      .then(() => {
        this.rootPage = LoginPage;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  public usu() {
    this.nav.push(UsuarioPage);

  }

  usuarioCurren() {
    this.movi = this.getUsuario();
  }

  getUsuario(): Observable<any> {
    return new Observable(observer => {
      firebase.database().ref('/AdventureApp/Usuarios/').orderByKey()
        .equalTo(this.afAuth.auth.currentUser.uid).once('value', (items: any) => {
          let user: any = [];
          items.forEach((item) => {
            user.push({
              displayName: item.val().displayName,
              perfilURL: item.val().perfilURL,

            });
          });
          observer.next(user);
          observer.complete();
        },
          (error) => {
            console.log("Observer error: ", error);
            console.dir(error);
            observer.error(error)
          });
    });
  }

}


