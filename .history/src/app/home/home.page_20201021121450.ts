import { AfterContentInit, Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import * as sal from 'sal.js'

import { AnimationsService } from '../services/animations.service';
import { AgendaService } from '../services/agenda.service';
import { CommonService } from '../services/common.service';
import { DataService } from '../services/data.service';

import { Data } from '../interfaces/data.interface';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterContentInit{

  form: FormGroup
  validation_messages

  icon = '../../assets/img/pin.png'

  data: Data
  msg = {
    name: '',
    phone: '',
    email: '',
    msg: ''
  }
  sending = false
  map: any

  srcWidth: number

  count = 0

  @HostListener('window:resize')
  getScreenSize() {
    this.srcWidth = window.innerWidth
  }

  constructor(
    private animationService: AnimationsService,
    private agendaService: AgendaService,
    private alertService: CommonService,
    private dataService: DataService,
  ) { this.getScreenSize() }

  ngOnInit() {
    sal({once: false})
    this.dataService.getData()
    .then(data => this.data = data)
    this.setForm()
  }

  ngAfterContentInit() {
    const titulo = document.getElementById('titulo')
    const subtitulo = document.getElementById('subtitulo')
    this.animationService.zoomIn(subtitulo)
  }

  setForm() {
    this.form = new FormGroup({
      'email': new FormControl('', Validators.compose([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])),
      'name': new FormControl('', Validators.compose([Validators.required])),
      'phone': new FormControl('', Validators.compose([Validators.minLength(10)])),
      'msg': new FormControl('', Validators.compose([Validators.required])),
    },
    { updateOn: 'blur'})

    this.validation_messages = {
      'email': [
          { type: 'required', message: 'Este campo es requerido' },
          { type: 'pattern', message: 'El correo ingresado, no es un correo válido' },
        ],
        'name': [
          { type: 'required', message: 'Este campo es requerido' },
        ],
        'msg': [
          { type: 'required', message: 'Este campo es requerido' },
        ],
      }
  }

  zoomIn(event) {
    this.animationService.zoomIn(event.originalTarget)
  }

  bounce(event) {
    this.animationService.bounce(event.originalTarget)
  }

  imgLoad(el: HTMLElement, hideEl: HTMLElement) {
    hideEl.classList.add('notDisplay')
    el.classList.remove('hidden')
    this.animationService.zoomIn(el)
  }

  imgLoadLeftEnter(el) {
    this.animationService.leftAnimation(el.originalTarget)
  }

  sendMsg() {
    this.sending = true
    const data = {
      dest: 'meiro.flores@gmail.com',
      name: this.msg.name,
      phone: this.msg.phone,
      email: this.msg.email,
      text: this.msg.msg
    }
    this.agendaService.sendEmail(data)
    .then(() => {
      this.sending = false
      this.alertService.presentToast('Correo enviado')
    })
    .catch(() => {
      this.sending = false
      this.alertService.presentToast('Lo sentimos, surgió un error al enviar el correo. Intenta de nuevo más tarde')
    })
  }

  mapLoaded(event) {
    this.map = event
    const cleanDark = [
      {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#263c3f'}]
      },
      {
        featureType: 'poi.business',
        stylers: [{visibility: 'off'}]
      },
      {
        featureType: 'transit',
        elementType: 'labels.icon',
        stylers: [{visibility: 'off'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#6b9a76'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#38414e'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#212a37'}]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9ca5b3'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#746855'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#1f2835'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#f3d19c'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#17263c'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#17263c'}]
      }
    ]
    this.map.setOptions({styles: cleanDark})
  }

}
