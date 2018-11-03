import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth-service';
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
  local : any
  establecimiento : any
  loader : any
  imgProfile: File
  fileToUpload: File = null;
  image: any
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private authService: AuthService,
    public loadingCtrl: LoadingController) {
    this.local = navParams.get('local')
    this.establecimiento = navParams.get('establecimiento')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalLocalPage');
    console.log(this.local, this.establecimiento);
    
  }

  editLocal(local){
    this.presentLoading("Actualizando registro...")
    this.authService.updateLocal(local).then(res =>{
      this.hideLoading()
      this.dismiss();
    }).catch(error=>{
      console.log(error);
      
    })
  }


  handleFiles(file){
    let img = file.srcElement.files[0];
    console.log(img);
    
    let myReader = new FileReader();
    myReader.onloadend = (e) => {
      this.image = myReader.result;
      console.log(this.image);
      
      this.authService.uploadImage(this.image.substring(this.image)).then(res => {
        console.log(res);
        
      }).catch(error => {
        console.log(error);
        
      })
      
    }
    myReader.readAsDataURL(img);
  }




  readThis(inputValue: any): void {
    let imgFormat: any; 
    console.log(inputValue);
    
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
