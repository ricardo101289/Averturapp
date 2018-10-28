import { Injectable } from '@angular/core';
 
import { AngularFireDatabase } from 'angularfire2/database';
 
import { Targetas } from './targetas';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
 
@Injectable()
export class EstudianteService { 
   
   user:any;
    private datosListRef=this.db.list('/AdventureApp/Targetas');
     private ciudadesListRef=this.db.list('/AdventureApp/Ciudades/');
     private ciudadesListRef_1=this.db.list('/AdventureApp/Ciudades_1/');


 private ciudadesListRef2;
 
   constructor(private db: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth,
    
  ) {
    }
   
  
  getTargetas()
  {
    return this.datosListRef;
  } 

  getCiudades()
  {
    return this.ciudadesListRef;
  } 
  
  getEstablecimientos()
  {
    return this.ciudadesListRef;
  } 
  
  
 
 addItem(item:Targetas){
   return this.datosListRef.push(item);
 }
 
  
}
