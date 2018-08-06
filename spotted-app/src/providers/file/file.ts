import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Camera, CameraOptions, DestinationType } from '@ionic-native/camera';
import { File, FileEntry, IFile } from '@ionic-native/file';


/*
  Generated class for the FileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FileProvider {

  constructor(public camera: Camera, public file: File) {
    console.log('Hello FileProvider Provider');
  }

  selecionaCamera() {
    return this.recebeFoto(this.camera.PictureSourceType.CAMERA);
  }

  recebeFoto(sourceType) {

    var opcoes = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.FILE_URI
    };

    var novoCaminho = this.file.externalDataDirectory;

    console.log(this.file.externalDataDirectory)

    return this.camera.getPicture(opcoes).then((imagePath) => {
      console.log(imagePath)
      var nomeOriginal = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var caminhoOriginal = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      let novoNome = this.criaNovoNome();
      return this.moveArquivo(caminhoOriginal, nomeOriginal, novoCaminho, novoNome);
    }, (err) => {
      console.log('Error na seleção da imagem.');
      return null;
    });
  }

  private criaNovoNome() {
    var d = new Date();
    var n = d.getTime();
    var novoNome = n + ".jpg";
    return novoNome;
  }

  private moveArquivo(caminhoOriginal, nomeOriginal, novoCaminho, novoNome) {
    console.log(caminhoOriginal);
    console.log(nomeOriginal);
    console.log(novoCaminho);
    console.log(novoNome);
    return this.file.moveFile(caminhoOriginal, nomeOriginal, novoCaminho, novoNome).then(success => {
      return { src: novoCaminho + novoNome, nome: novoNome };
    }, error => {
      return null;
    });
  }

}
