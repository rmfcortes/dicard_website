import { AfterContentInit, Component, HostListener, OnInit } from '@angular/core';

import * as sal from 'sal.js'

import { DataService } from '../services/data.service';

import { Data } from '../interfaces/data.interface';
import { AnimationsService } from '../services/animations.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterContentInit{

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
    console.log(this.srcWidth);
  }

  constructor(
    private animationService: AnimationsService,
    private dataService: DataService,
  ) { this.getScreenSize() }

  ngOnInit() {
    sal({once: false})
    this.dataService.getData()
    .then(data => this.data = data)
  }

  ngAfterContentInit() {
    const titulo = document.getElementById('titulo')
    // this.animationService.leftAnimation(titulo)
    const subtitulo = document.getElementById('subtitulo')
    this.animationService.zoomIn(subtitulo)
  }

  zoomIn(event) {
    this.animationService.zoomIn(event.originalTarget)
  }

  bounce(event) {
    this.animationService.bounce(event.originalTarget)
  }

  imgLoad(image) {
    console.log(image);
    
  }

  sendMsg() {

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
