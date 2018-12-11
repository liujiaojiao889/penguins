
/**
  排行榜
*/
import UTILS from '../../config/utils.js';
import { messageCenter, observer} from '../../module/init_module';
export class FudaiPopDialog extends fudaiPopUI {
  constructor(...args){
    super(...args);
    this.init();
  }

  init() {
    this.initDom();

    this.initEvent();

  }

  // 注册

  registerAction({messageCenter, observer}) {
    // 数据传输
    messageCenter.registerAction("queen", this.rendermfudai.bind(this));

    // 订阅弹层
    observer.subscribe("pop::fudai",this.myShow.bind(this));
  }


  initDom() {
    // 关闭按钮
    this.dom_close_btn = this.getChildByName("close_btn");
  }


  // 初始化事件
  initEvent() {
    this.dom_close_btn.on(Laya.Event.CLICK, this, this.close);

    // 未登录
    // this.dom_unloaded.on(Laya.Event.CLICK, this, UTILS.gotoLogin);

  }

  // 加载中或者显示数据
  isLoadingOrContent(type) {
    // 暂无数据
    if(type === 0){

      this.dom_loading.visible=true;
      this.dom_loading.text="暂无数据……";
      this.tab_con.visible=false;
      this.dom_unloaded.visible=false;

    // 加载中
    }else if(type === 1){

      this.dom_loading.visible=true;
      this.dom_loading.text="加载中……";
      this.tab_con.visible=false;
      this.dom_unloaded.visible=false;

    // 显示内容
    }else if(type ===2){
      this.dom_loading.visible=false;
      this.tab_con.visible=true;
      this.dom_unloaded.visible=false;

    // 未登录
    }else if(type ===3){
      this.dom_loading.visible=false;
      this.tab_con.visible=false;
      this.dom_unloaded.visible=true;
    }

  }

  transformNum(amount) {
    if(amount>= 100000){
        amount = Math.floor((amount/10000)*100)/100;
        amount =amount + "万";
      }
      return amount;
  }
  // 女王赏金
  rendermfudai(data) {

    let fudaiData = data.res ;
    let result = [] ;
    let config = [] ;

    if(data.code !== 0 ){
      return;
    }
    observer.publish("fudai::update", fudaiData);
    this.fudai_amount.text = UTILS.addThousandSymbol(fudaiData.amount);
    // 配置
    fudaiData.conf.forEach((item,index)=>{
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
    this.list_config.array = config ;

    // 数据
    fudaiData.list.forEach((item , index) => {
      let _fudaiData = fudaiData.list[index];

      let _Time =_fudaiData.addTime.split(' ');
      let cutIndex = _Time[1].lastIndexOf(":");
      let _myTime;
      _Time[1].slice(0, cutIndex);
      _myTime = _Time[0] + ' '+  _Time[1].slice(0, cutIndex);


      result.push({
        name: UTILS.getActiveStr(_fudaiData.name, 10),
        amount:  UTILS.getActiveStr(parseInt(_fudaiData.winAmount), 10),
        time: _myTime
      })

    })

    this.list_fudai_all.array = result;

    if(fudaiData.list.length === 0 ){
      this.isLoadingOrContent(0);
    }else{
      this.isLoadingOrContent(2);
    }


  }


  // 出现
  myShow() {
     messageCenter.emit('queen');
    // 弹层显示
    this.popup();
  }


}