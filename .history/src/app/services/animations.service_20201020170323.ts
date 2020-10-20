import { Injectable } from '@angular/core';
import { createAnimation, Animation } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationsService {

  constructor() { }

  enterAnimation(element) {
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

}
