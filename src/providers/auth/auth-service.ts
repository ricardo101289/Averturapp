import { Injectable } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Usuarios } from './user';
import * as firebase from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  private ciudadesListRef;


  constructor(private angularFireAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private gplus: GooglePlus,
    private facebook: Facebook,
    public afiredatabase: AngularFireDatabase,
    private _firebaseAuth: AngularFireAuth
  ) { }
  us: any;
  createUser(user: Usuarios) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  getUsuario(): Observable<any> {
    return new Observable(observer => {
      firebase.database().ref('/AdventureApp/Usuarios/').orderByKey()
        .equalTo(this.angularFireAuth.auth.currentUser.uid).once('value', (items: any) => {
          let user: any = [];
          items.forEach((item) => {
            user.push({
              displayName: item.val().displayName,
              perfilURL: item.val().perfilURL,
              email: item.val().email,
              id: this.angularFireAuth.auth.currentUser.uid,

            });
          });
          observer.next(user);
          observer.complete();
        },
          (error) => {
            observer.error(error)
          });

    });
  }


  createUserWithEmailAndPassword(usuarios: Usuarios) {
    var promise = new Promise((resolve, reject) => {
      this.angularFireAuth.auth.createUserWithEmailAndPassword(usuarios.email, usuarios.password).then(value => {
        this.us = value.user;
        this.us.updateProfile(
          { displayName: usuarios.nombre, photoURL: usuarios.perfilURL }
        );
        this.angularFireAuth.auth.updateCurrentUser(this.us);
        this.afiredatabase.list('/AdventureApp/Usuarios/').update(this.angularFireAuth.auth.currentUser.uid, {
          displayName: usuarios.nombre, email: usuarios.email, perfilURL: usuarios.perfilURL,
        });
        resolve(true);
      }).catch((err) => {
        reject(err);
      });
    })
    return promise;
  }

  createUserWithEmailAndPasswordLugares(usuarios: Usuarios) {
    var promise = new Promise((resolve, reject) => {
      this.angularFireAuth.auth.createUserWithEmailAndPassword(usuarios.email, usuarios.password).then(value => {
        this.us = value.user;
        this.us.updateProfile({ displayName: usuarios.nombre, photoURL: usuarios.perfilURL });
        this.angularFireAuth.auth.updateCurrentUser(this.us);
        this.afiredatabase.list('/AdventureApp/Usuarios/').update(this.angularFireAuth.auth.currentUser.uid, {
          nit: usuarios.nit,
          displayName: usuarios.nombre,
          tipo_Servicio: usuarios.tipo_servicio,
          dirección: usuarios.direccion,
          ciudad: usuarios.ciudad,
          email: usuarios.email,
          perfilURL: usuarios.perfilURL,
        });
        this.angularFireAuth.auth.updateCurrentUser(this.us);
        this.ciudadesListRef = firebase.database().ref('/AdventureApp/Ciudades').child(usuarios.ciudad).child('Establecimientos')
          .child(usuarios.tipo_servicio).push(usuarios);
        resolve(true);
      }).catch((err) => {
        reject(err);
      });
    })
    return promise;
  }

  signIn(usuarios: Usuarios) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(usuarios.email, usuarios.password);
  }

  signInWithEmailAndPassword(usuarios: Usuarios) {
    var promise = new Promise((resolve, reject) => {
      console.log(usuarios);
      this.angularFireAuth.auth.signInWithEmailAndPassword(usuarios.email, usuarios.password).then(res => {
          console.log(res);
          resolve(res)
        }).catch((error) => {
          reject(error);
        })
    })
    return promise;
  }


  async nativeGoogleLogin(): Promise<void> {
    try {
      const gplusUser = await this.gplus.login({
        'webClientId': '648450091349-k1ies0a10h4atdodmf1vom34sblj6n9f.apps.googleusercontent.com',
        'offline': true,
      }).then(res =>{
        return  this.angularFireAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken)).then(res =>{
        }).catch(error =>{
          return error
        })
      })
      
  
    } catch(error) {
      return error
    }
  }

  signInWithFacebook() {
    return this.facebook.login(["email", "public_profile", "user_friends"]).then(res =>{
        return this.angularFireAuth.auth.signInWithCredential(firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken));
    })
    .catch(error =>{
        return error
      })
  }

  signOut() //: firebase.Promise<any>
  {
    if (this.angularFireAuth.auth.currentUser.providerData.length) {
      for (var i = 0; i < this.angularFireAuth.auth.currentUser.providerData.length; i++) {
        var provider = this.angularFireAuth.auth.currentUser.providerData[i];
        if (provider.providerId == firebase.auth.GoogleAuthProvider.PROVIDER_ID) { // Se for o gooogle
          return this.signOutFirebase();
          //  });
        } else if (provider.providerId == firebase.auth.FacebookAuthProvider.PROVIDER_ID) { // Se for facebook
          return this.facebook.logout()
            .then(() => {
              return this.signOutFirebase();
            })
        }
      }
    }

    return this.signOutFirebase();
  }

  private signOutFirebase() {
    return this.angularFireAuth.auth.signOut();
  }

  resetPassword(email: string) {
    return this.angularFireAuth.auth.sendPasswordResetEmail(email);
  }
}
