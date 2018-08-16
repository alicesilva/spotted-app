import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { Comentario } from '../../models/comentarios';
import { ComentarioProvider } from '../../providers/comentario/comentario';

/**
 * Generated class for the ComentariosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comentarios',
  templateUrl: 'comentarios.html',
})
export class ComentariosPage {

  comentario: Comentario;
  comentarios: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public comentarioProvider: ComentarioProvider,
    private toastCtrl: ToastController) {
    this.comentario = new Comentario();
    this.comentario.spotted = this.navParams.data;
    this.comentarioProvider.getAll(this.comentario.spotted).valueChanges().subscribe(comentarios => {
      this.comentarios = comentarios;
    },(err)=>{
      console.log(err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComentariosPage');
  }

  addComentario(){
    if(this.comentario.texto == null || this.comentario.texto == ""){
      let toast = this.toastCtrl.create({
        message: 'Escreva um comentário antes de enviar!',
        duration: 3000,
        position: 'bottom'
      });
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
      toast.present();
    }else{
      this.comentarioProvider.save(this.comentario).then(()=>{
        console.log("Salvou");
        this.comentario.texto = null;
      }).catch(()=>{
        console.log("Não salvou");
      });
    }
  }
}
