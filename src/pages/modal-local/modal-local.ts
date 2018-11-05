import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth-service';
import { CitiesProvider }  from '../../providers/cities/cities'
/**
 * Generated class for the ModalLocalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-local',
  templateUrl: 'modal-local.html',
})
export class ModalLocalPage {
  @ViewChild('myNav') nav: NavController;
  local : any
  establecimiento : any
  loader : any
  imgProfile: File
  fileToUpload: File = null;
  image: any
  actionLocal : any
  subCategories : any = []
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private authService: AuthService,
    public loadingCtrl: LoadingController,
    public cities : CitiesProvider  
  ) {
    console.log(this.cities.categorys);
    
      this.actionLocal = navParams.get('action')
      console.log(this.actionLocal);
      if (navParams.get('action') === "edit") {
        this.local = navParams.get('local')
        this.establecimiento = navParams.get('establecimiento')
      }else{
        this.local = {
          ciudad : "",
          direccion : "",
          email : "",
          latitude : "",
          longitude : "",
          nit : "",
          nombre : "",
          password : "",
          perfilURL : "https://firebasestorage.googleapis.com/v0/b/adaventure-d4d5e.appspot.com/o/images%2Fcali.png?alt=media&token=d75da7bd-7d42-4373-9a37-43da129b3a75",
          registerUnique : "",
          tipo_servicio : "",
          subcategoria : ""
        }
      }
  }

  ionViewDidLoad() {
  }

  getSubcategories(categories){
    for (let i in this.cities.categorys){
      if(this.cities.categorys[i].nombre === categories){
        for(let j in this.cities.categorys[i].subcategorias){
          this.subCategories.push(this.cities.categorys[i].subcategorias[j].nombre) 
        }
      }
    }
  }

  onChange(newVal) {
    console.log(newVal);
    this.subCategories = []
    this.getSubcategories(newVal)
}

  editLocal(local){
    this.presentLoading("Actualizando registro...")
    this.authService.updateLocal(local).then(res =>{
      this.hideLoading()
      this.updateEstablishments()
    }).catch(error=>{
      console.log(error);
      
    })
  }
  
  addNewLocal(local){
    console.log(local);
    // this.setCoordinate(local.direccion)
    this.presentLoading("Añadiendo registro...")
    this.authService.addLocal(local).then(res =>{
      console.log(res);
      this.hideLoading()
      this.updateEstablishments()
    }).catch(error=>{
      console.log(error);
      
    })
  }

  handleFiles(file, local){
    this.presentLoading("Actualizando Imagen de local...")
    let img = file.srcElement.files[0];
    let myReader = new FileReader();
    myReader.onloadend = (e) => {
      this.image = myReader.result;
      this.authService.uploadImage(this.image.substring(this.image)).then(res => {
        local.perfilURL = res
        this.hideLoading()
      }).catch(error => {
        console.log(error);
        this.hideLoading()
      })
    }
    myReader.readAsDataURL(img);
  }

  readThis(inputValue: any): void {
    let imgFormat: any; 
    var file: File = inputValue.files[0]; var myReader: FileReader = new FileReader(); var separador = "."; var arregloDeImg = file.name.split(separador);
    if(arregloDeImg[1]=== "png"){
      imgFormat = 22 
    }else{
      imgFormat = 23
    }
    myReader.onloadend = (e) => {
      this.image = myReader.result;
      this.authService.uploadImage(this.image.substring(imgFormat, this.image.length)).then(res => {
        console.log(res);
      }).catch(error => {
        console.log(error);
      })
    }
    myReader.readAsDataURL(file);
  }

  updateEstablishments(){
    this.authService.local =  []
    this.presentLoading("Actualizando registro...")
    this.authService.getEstablishments().then(res =>{
      this.authService.Establishments = res
      for(let i in this.authService.Establishments){
        this.getLocal(this.authService.Establishments[i].tipo)
      }
      this.hideLoading()
      this.viewCtrl.dismiss();
    }).catch(error =>{
      console.log(error);
      this.dismiss()
    })
  }

  getLocal(tipo){
    this.authService.getLocalAll(tipo).then(res =>{
      let response : any = res
      if (response.length > 0) {
        for (let i in response){
          this.authService.local.push(response[i])
        }
        console.log(this.authService.local);
      }
    }).catch(error =>{
      console.log("error Local: ", error);
      this.hideLoading()
      this.viewCtrl.dismiss();
    }
    )
  }

  presentLoading(text) {
    this.loader = this.loadingCtrl.create({
      content: text,
    });
    this.loader.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  hideLoading(){
    this.loader.dismiss();
  }

}
