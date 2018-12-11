
/**
  宝藏说明弹层
*/

import { messageCenter, observer} from '../../module/init_module';
export class InstructPopDialog extends instructPopUI{
  constructor(){
    super();
    this.init();
  }

  init() {
     this.multiply = this.multiply_box.find("item" ,true);
     this.btn_close.on(Laya.Event.CLICK, this , this.myClose);
  }

  // 注册
  registerAction({messageCenter,observer}) {
    messageCenter.registerAction("treasure", this.renderMultiply.bind(this));
    observer.subscribe('pop::instruct', this.myShow.bind(this));
  }

  renderMultiply(data) {
    console.log(data);
    let multiplyLevel = data.res;

    if(Number(data.code) !== 0 ){
      return;
    }
    multiplyLevel.forEach((item, index)=>{
      this.multiply[index].text  = item.p + '倍';
    })
  }

  myShow() {
    messageCenter.emit('treasure');
    this.popup();
  }

  myClose() {
    this.close();
  }
}