import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

import { MainProfile } from '../interfaces/perfil.interface';
import { UidService } from './uid.service';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  loader
  public perfil = new BehaviorSubject<MainProfile>(null)

  constructor(
    private toastCtrl: ToastController,
    private loadCtrl: LoadingController,
    private alertController: AlertController,
    private uidService: UidService,
  ) { }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          cssClass: 'cancel_btn_alert',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    })

    await alert.present()
  }

  async presentAlertRadio(inputs, header: string) {
    return new Promise(async (resolve, reject) => {
      const alert = await this.alertController.create({
        header,
        inputs,
        buttons: [
          {
            text: 'Cerrar',
            role: 'cancel',
            cssClass: 'cancel_btn_alert',
            handler: () => {
              resolve(null)
            }
          }, {
            text: 'Aceptar',
            cssClass: 'accept_btn_alert',
            handler: (value) => {
              resolve(value)
            }
          }
        ]
      })
  
      await alert.present()
    })
  }

  async presentAlertAction(titulo: string, msn: string, btnAceptar: string, btnCancelar: string) {
    return new Promise(async (resolve, reject) => {
      const alert = await this.alertController.create({
        header: titulo,
        message: msn,
        buttons: [
          {
            text: btnCancelar,
            role: 'cancel',
            cssClass: 'cancel_btn_alert',
            handler: (blah) => {
              resolve(false)
            }
          },
          {
            text: btnAceptar,
            cssClass: 'accept_btn_alert',
            handler: () => {
              resolve(true)
            }
          }
        ]
      })

      await alert.present()
    })
  }

  async presentPromptTelefono() {
    return new Promise(async (resolve, reject) => {
      const nombre = this.uidService.getNombre()
      const alert = await this.alertController.create({
        header: 'Agrega un teléfono',
        message: 'Contar con tu teléfono es importante, ' +
          'en caso de que el repartidor o ' + nombre + ' necesiten ponerse en contacto contigo. ' +
          'El número debe ser de 10 dígitos',
        inputs: [
          {
            name: 'telefono',
            type: 'tel',
            placeholder: 'Ej. 3314473715',
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'cancel_btn_alert',
            handler: () => {
              resolve(false)
            }
          }, {
            text: 'Guardar',
            cssClass: 'accept_btn_alert',
            handler: (data) => {
              resolve(data)
            }
          }
        ]
      });
      await alert.present()
    })
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    })
    toast.present()
  }

  async presentToastconBoton(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      buttons: [
        {
          text: 'Aceptar',
          role: 'cancel',
        }
      ]
    })
    toast.present()
  }

  async presentPrompt(inputs, btnAcept: string, btnCancel: string, header?: string, message?: string) {
    return new Promise(async (resolve, reject) => {
      const alert = await this.alertController.create({
        header,
        message,
        inputs,
        buttons: [
          {
            text: btnCancel,
            role: 'cancel',
            cssClass: 'cancel_btn_alert',
            handler: () => {
              resolve(false)
            }
          }, {
            text: btnAcept,
            cssClass: 'accept_btn_alert',
            handler: (data) => {
              resolve(data)
            }
          }
        ]
      })
      await alert.present()
    })
  }

  async showLoaderMain(message?: string) {
    this.loader = await this.loadCtrl.create({
      message,
    })

    return await this.loader.present()
  }

  hideLoader() {
    this.loadCtrl.dismiss()
  }

  setInfo(perfil: MainProfile) {
    this.perfil.next(perfil)
  }


  distance( lat1: number, lng1: number, lat2: number, lng2: number): Promise<number> {
    return new Promise (async (resolve, reject) => {
      const R = 6371; // Radius of the earth in km
      const dLat = this.deg2rad(lat2 - lat1) // this.deg2rad below
      const dLon = this.deg2rad(lng2 - lng1)
      const a =
         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
         Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
         Math.sin(dLon / 2) * Math.sin(dLon / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      const d = R * c // Distance in kms
      resolve(d)
    })
  }

  deg2rad( deg ) {
    return deg * (Math.PI / 180)
  }

}
