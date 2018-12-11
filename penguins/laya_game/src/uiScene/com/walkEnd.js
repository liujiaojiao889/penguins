
import {observer, messageCenter } from '../../module/init_module';
import BottomUIView from '../bottom';
import PenguinUIView from '../penguin';

export default class PenguinWalkEnd {
    constructor() {
      PenguinWalkEnd.instance = this ;
    }

    static getInstance() {
        return this.instance || new this();
    }

    hammerPlace(posX,posY){
      console.log("道具动画");

      let type = BottomUIView.getInstance().checkHammerType();
      let sizeObj = {
              x: posX,
              y: posY,
              anchorX: 0,
              anchorY: 1
      }
     /* let hammer_bg = 'ani/hammer' + i;
      this.hammer = createSkeleton(hammer_bg, 24);*/
      this.hammerAni = new Laya.Image();
      this.hammerAni.skin = `images/animate/hammer_${type}.png`;
      this.hammerAni.set(sizeObj);
      PenguinUIView.getInstance().addChild(this.hammerAni);

      setTimeout(() => {
            this.hammerAni.destroy();
            this.hammerAni = null;
            observer.publish("game::reset");
            observer.publish("game::stop");
        }, 500);

    }

    amountResult() {

    }
}
