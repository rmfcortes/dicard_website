import { Injectable } from '@angular/core';
import { createAnimation, Animation } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationsService {

  constructor() { }

  leftAnimation(element: HTMLElement) {
    return new Promise((resolve, reject) => {
      const anim: Animation = createAnimation()
        .addElement(element)
        .duration(800)
        .iterations(1)
        .fromTo('transform', 'translateX(-100px)', 'translateX(0px)')
        .fromTo('opacity', '0.1', '1')
      anim.play()
      anim.onFinish(() => resolve())
    })
  }

  zoomIn(element: HTMLElement) {
    return new Promise((resolve, reject) => {
      const anim: Animation = createAnimation()
        .addElement(element)
        .duration(800)
        .iterations(1)
        .fromTo('opacity', '0.1', '1')
      anim.play()
      anim.onFinish(() => resolve())
    })
  }

}
