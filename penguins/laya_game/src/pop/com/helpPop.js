
/**
	帮助弹层
*/
import zsySlider from '../../common/laya.zsySlider';
import { messageCenter, observer} from '../../module/init_module';
export class HelpPopDialog extends helpPopUI{
	constructor(){
		super();
		this.init();
	}

	init() {
		this.initDom();
		this.initEvent();

	}

	// 注册
	registerAction({messageCenter,observer}) {

		messageCenter.registerAction("help", this.renderConfig.bind(this))
		// 订阅弹层
		observer.subscribe('pop::help', this.myShow.bind(this));
	}

	initDom() {

		this.multiply = this.help_glr.find("multiply" ,true);
		this.descript = this.help_glr.find("descript" ,true);

		this.config.on(Laya.Event.MOUSE_DOWN, self, (event) => {
    	event.stopPropagation();
    	return;
    });
	    // 初始化帮助页滑动效果
	    new zsySlider(this.help_glr);

	}

	initEvent() {
		this.getChildByName("close_btn1").on(Laya.Event.CLICK, this , this.myClose);
		this.getChildByName("close_btn2").on(Laya.Event.CLICK, this, this.myClose);
	}
  transformNum(amount) {
    if(amount>= 100000){
        amount = Math.floor((amount/10000)*100)/100;
        amount =amount + "万";
      }
      return amount;
  }
	renderConfig(data) {
		let multiplyLevel = data.res.muls;
		let descript = data.res.conf;
		let config = [] ;
    if(Number(data.code) !== 0 ){
      return;
    }

    multiplyLevel.forEach((item, index)=>{
    	this.multiply[index].text  = item.p + '倍';
    })
    // 配置
    descript.forEach((item,index)=>{
          let start = this.transformNum(Number(item.start));
      // let share = this.transformNum(Number(item.share));
      let fixed = this.transformNum(Number(item.fixed));
      let _text1 = `投币额≥${start},有机会赢${item.share}%的奖励`;
      let _text2 = '';

      item.fixed ? _text2 = `,最高可得${fixed}` : _text2 = '';

      config.push({
        descript :_text1+_text2
      })
    })
    this.config.array = config ;
	}

	myShow() {
		messageCenter.emit('help');
		this.popup();
	}

	myClose() {
		this.close();
	}
}