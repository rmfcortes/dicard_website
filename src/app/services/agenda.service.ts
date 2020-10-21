import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(
    private httpAngular: HttpClient,
  ) { }


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
