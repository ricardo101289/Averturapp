import { Component,ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../providers/auth/auth-service';
import { NavController } from 'ionic-angular';
import { UsuarioPage } from '../pages/usuario/usuario';
import { SlidersPage} from '../pages/sliders/sliders';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';


import { AngularFireAuth } from 'angularfire2/auth';
import { MapPage } from '../pages/map/map';
import { AboutPage } from '../pages/about/about';
export interface MenuItem {
  title: string;
  component: any;
  icon: string;
}
/*       <ion-avatar item-left>
            <img [src]="user.photo || 'assets/img/profile.png'" />
        </ion-avatar>
          <ion-input type="text" placeholder="What's on your mind?"> 
        </ion-input>

        <ion-icon name="aperture" item-right></ion-icon>
       */
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  appMenuItems: Array<MenuItem>;
  appMenuItems2: Array<MenuItem>;

  public navCtrl: NavController;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public afAuth: AngularFireAuth,
    private authService: AuthService,) {

    afAuth.authState.subscribe(user => {
      if (user) {
        this.rootPage =HomePage ;
    this.usuarioCurren();
        
      } else {
        this.rootPage =SlidersPage;// PrincipalPage;//
      }
    });
    this.appMenuItems = [
      {title: 'Home', component: HomePage, icon: 'home'},
      { title: 'Places', component:MapPage,  icon: 'md-globe' },
      { title: 'mi ubicacion', component: MapPage, icon: 'logo-rss' },
      { title: 'Cotact', component: AboutPage, icon: 'md-mail' },
      { title: 'About', component:AboutPage, icon: 'information-circle' },

     // {title: 'Local Weather', component: LocalWeatherPage, icon: 'partly-sunny'}
    ];

this.appMenuItems2 = [
      { title: 'Account', component: UsuarioPage, icon: 'person' },
    ];
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(appMenuItems) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(appMenuItems.component);
  }
  public signOut() {
    this.authService.signOut()
      .then(() => {
        this.rootPage=LoginPage;
      }) 
      .catch((error) => {
        console.error(error);
      });
  }

  public usu() {
    this.nav.push(UsuarioPage);
     
}
public movi   : any;

usuarioCurren(){
  this.movi= this.getUsuario();
  }

  getUsuario() :Observable<any>
   {

  return new Observable(observer =>
    {
   
       firebase.database().ref('/AdventureApp/Usuarios/').orderByKey()
       .equalTo(this.afAuth.auth.currentUser.uid).once('value', (items : any) =>
    
      {
      let user:any=[];

         items.forEach((item) =>
         {
           user.push({
            displayName   :item.val().displayName,
             perfilURL     : item.val().perfilURL,
            
          });
         // this.targetas.nombreUser=item.val().displayName;
          //this.targetas.pertilUser=item.val().photoURL;


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

}


