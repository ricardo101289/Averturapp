import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
//import {Keyboard} from '@ionic-native/keyboard';
 
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { IonicStorageModule } from '@ionic/storage';
import { PostPopover } from '../pages/speaker-list/post-popover';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { EstablecimientosPage } from '../pages/establecimientos/establecimientos';
 
import {HttpModule} from '@angular/http';

import { AuthService } from '../providers/auth/auth-service';
import{EstudianteService} from '../providers/auth/estudiante.service'

import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { ImagePicker } from '@ionic-native/image-picker';
import { TermsPage } from '../pages/terms/terms';

import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
 import {RegistroLugaresPage} from '../pages/registro-lugares/registro-lugares';
 

// import services 

// Import library firbease
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
    
// import pages
// end import pages

 
import { AboutPage } from '../pages/about/about';
import { PopoverPage } from '../pages/about-popover/about-popover';
import { MapPage } from '../pages/map/map';
import { SchedulePage } from '../pages/schedule/schedule';
import { ScheduleFilterPage } from '../pages/schedule-filter/schedule-filter';
import { UsuarioPage } from '../pages/usuario/usuario';
import { SpeakerListPage } from '../pages/speaker-list/speaker-list';
import { SlidersPage} from '../pages/sliders/sliders';
import { ImageProvider } from '../providers/image/image';
import { Http } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PrincipalPage } from '../pages/principal/principal';
import{LoginLugaresPage} from '../pages/login-lugares/login-lugares'
import { GalleryPostPage } from '../pages/gallery-post/gallery-post';
import{ForgotPasswordPage} from '../pages/forgot-password/forgot-password';
import { DetailPage } from '../pages/detail/detail';
import { Config } from '../providers/config';

import { GalleryPosterComponent } from './gallery-poster/gallery-poster';
import {Targetas} from '../providers/auth/targetas'
 
const firebaseConfig = {
   apiKey: "AIzaSyCHthOzqJFKTRH0Q0_TC06dSUsYTf7pHHY",
  authDomain: "prueba-bda12.firebaseapp.com",
  databaseURL: "https://prueba-bda12.firebaseio.com",
  projectId: "prueba-bda12",
  storageBucket: "prueba-bda12.appspot.com",
  messagingSenderId: "1073113290610"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    LoginPage,
    MapPage,
    PopoverPage,
    SlidersPage,
    PrincipalPage,
    SchedulePage,
    ScheduleFilterPage,
    SpeakerListPage,
    RegisterPage,
    UsuarioPage,
    LoginLugaresPage,
    RegistroLugaresPage,
    ForgotPasswordPage,
    GalleryPostPage,
    DetailPage,
    PostPopover,
    EstablecimientosPage,
    TermsPage,
    GalleryPosterComponent
     
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],

  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    }),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage,
    LoginPage,
    MapPage,
    SlidersPage,
    PrincipalPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SpeakerListPage,
    RegisterPage,
    UsuarioPage,
    LoginLugaresPage,
    ForgotPasswordPage,
    RegistroLugaresPage,
    GalleryPostPage,
    DetailPage,
    TermsPage,
    PostPopover,
    EstablecimientosPage,
    GalleryPosterComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    AuthService,

    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    AngularFireDatabase,
    EstudianteService,
    GooglePlus,
    Facebook,
    Config,
    ImagePicker,
 
    ImageProvider
  ]
})
export class AppModule {}
