import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Data } from '../interfaces/data.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  getData(): Promise<Data> {
    return new Promise((resolve, reject) => {
      const dataSub = this.db.object('dicard').valueChanges().subscribe((data: Data) => {
        dataSub.unsubscribe()
        resolve(data)
      })
    })
  }
}
