import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';
import { CommonService } from './common.service';

import { UidService } from './uid.service';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(
    private httpAngular: HttpClient,
    private db: AngularFireDatabase,
    private commonService: CommonService,
    private uidService: UidService,
  ) { }

  getAppointments(day: string): Promise<string[][]> {
    return new Promise((resolve, reject) => {
      const uid = this.uidService.getUid()
      const resSub = this.db.list(`principal/${uid}/appoiments/${day}`).valueChanges().subscribe((reservations: string[][]) => {
        resSub.unsubscribe()
        resolve(reservations)
      })
    })
  }

  async setAppointment(day: string, hour: string) {
    const uid = this.uidService.getUid()
    try {
      await this.db.object(`appoiments/${uid}/${day}`).set([hour])
      const name = this.uidService.getNombre()
      this.commonService.presentToastconBoton(`¡Enhorabuena!, haz reservado con ${name}. En breve recibirás confirmación vía telefónica`)
    } catch (error) {
      
    }
  }

  sendEmail(data) {
    return new Promise((resolve, reject) => {
      const body = {
        origen: 'email',
        data
      }
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'secret-key'
        })
        }
      this.httpAngular.post('https://us-central1-tarjetas-f3aef.cloudfunctions.net/request/', body, httpOptions)
      .subscribe(
      res => resolve(res),
      err => {
        console.log(err)
        err.status === 200 ? resolve(err.error.text) : reject(err.error.text)
      })
    })
  }

}
