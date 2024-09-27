import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  nombre: string = "";
  constructor(private alertController: AlertController, private storage: NativeStorage) { }

  buscar(){
    this.storage.getItem(this.nombre).then(data=>{ //// then oara la excepcion, si se obtiene el nombre, alerta del valor + data
      this.presentAlert("valor" + data);
    })

  }
  async presentAlert(msj:string) {
    const alert = await this.alertController.create({
      header: 'Info',
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }
  ngOnInit() {
  }

}
