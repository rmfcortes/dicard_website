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
        .duration(2500)
        .iterations(1)
        .keyframes([
          { offset: 0, opacity: '0' },
          { offset: 1, opacity: '0.99' }
        ])
      anim.play()
      anim.onFinish(() => resolve())
    })
  }

}
