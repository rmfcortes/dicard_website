import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  loader
  constructor(
    private toastCtrl: ToastController,
    private loadCtrl: LoadingController,
  ) { }



  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    })
    toast.present()
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


}
