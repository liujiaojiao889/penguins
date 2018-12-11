/**
 *游戏区域
 */
import { observer, messageCenter } from '../module/init_module';
import UTILS from '../config/utils';
import { createSkeleton } from '../common/laya.custom';
import BottomUIView from './bottom';
import HeaderUIView from './header';
import RoomScene from './room';
import AudioMudule from '../module/com/audio';
import CommonGameModule from '../module/com/commonGameModule';
import {PenguinWalk} from './com/walkRouter';
import {animate_bezier_move} from './com/bezier';

export default class PenguinUIView extends penguinUI{
  constructor(){
    super();

    this.init();

     PenguinUIView.instance = this;
  }

  static getInstance() {
        return this.instance || new this();
    }

  init() {
    this.initConfig();

    this.registerAction();

    this.initEvent();

    // this.initPenguinPos();
  }

  initConfig() {
    this.stageX = 0;
    this.stageY = 0;
    this.isGameing = false;    //游戏未开始
    this.isClick = false;   //是否点击
    this.movingEnd = false; //企鹅是否行走结束
    this.isComplete = false; //完整一局


    this.goPenguin = null;  //企鹅

    this.result_data = [];     //bet结果
    this.code = 0;

    this.loadingTime = 0;
    this.penguinArea =  Math.floor(Laya.stage.height/750*370);
    this.height = this.penguinArea;
    this.area.height =this.penguinArea;
    this.digArea.height =  this.penguinArea;

    this.type = 0;
    this.wayroute = [];

    this.treasurePos = []; //宝藏重新定位

  }

  registerAction(){
    messageCenter.registerAction("bet", this.resultCome.bind(this));             //点击开始

    observer.subscribe('walk::handler', this.wayRouteHandler.bind(this));

    observer.subscribe('check::hammer', this.checkHmmer.bind(this));

    observer.subscribe('game::start', this.gemeStart.bind(this));

    observer.subscribe('game::reset', this.isReset.bind(this));

    observer.subscribe('walk::stop', this.nextDig.bind(this));
  }

  // 通过道具类型判断企鹅类型
  checkHmmer(type) {
    this.type = type;
    if(this.goPenguin){
      this.goPenguin.url = `images/animate/penguin_${this.type}.sk`;
    }else{
      this.goPenguin = createSkeleton(`images/animate/penguin_${this.type}`);
      this.digPenguin.addChildAt(this.goPenguin, 1);
      this.goPenguin.play('normal', true);
      this.goPenguin.x = 25;
      this.goPenguin.y = -55;
    }
  }

    //随机数
  getRandom(rmin, rmax) {
      var range = rmax - rmin;
      var rand = Math.random();
      return (rmin + Math.round(rand * range));
  }

  // 随机位置，用于初始化企鹅位置和自动玩挖宝位置
  randomPenguinPos(isAuto) {
    let _width = this.digArea.width,
        _height = this.digArea.height;

    let stage_x,
        stage_y,
        radom_x,
        radom_y;

    if(isAuto){
      let _autoPX = this.digPenguin.x,
          _autoPY = this.digPenguin.y;

          radom_x = this.getRandom(_autoPX-200, _autoPX + 200), //随机挖宝位置x
          radom_y = this.getRandom(_autoPY-200, _autoPY + 200);         //随机挖宝位置y

    } else{
        radom_x = Math.floor(_width*Math.random());
        radom_y = Math.floor(_height*Math.random());
    }

    stage_x =Math.max(230, radom_x);
    stage_x =Math.min(950, stage_x);

    stage_y =Math.max(100, radom_y);
    stage_y =Math.min(370, stage_y);

    return{stage_x,stage_y}
  }

  initEvent() {
    this.digArea.on(Laya.Event.CLICK, this, (e)=>{
      if(!this.goPenguin){
        this.errorHandler();
        return;
      }
      let bottom = BottomUIView.getInstance(),
          room = RoomScene.getInstance(),

          bool = bottom.checkEnoughBet(),
          hideAuto = bottom.autoplay_box.getChildAt(0).visible,
          hideMune = room.menu_box.getChildAt(0).visible,

          target = this.btn_instruct || this.hinder_one ||this.hinder_two ||  this.hinder_three;

      if(hideAuto || hideMune) return;
      if(e.target ==  target) return;

      if(this.isGameing || this.isClick || bottom.config.isAuto){
        console.log('isGameing, isClick, isAuto:',this.isGameing, this.isClick, bottom.config.isAuto);
        return;
      }

      if (bool) {
        this.isClick = true;
        console.log(e.stageX, e.stageY);
        this.posX = e.stageX;  //挖宝的位置
        this.posY = e.stageY;
        this.emit();
        this.goPenguin.play('normal', true);
        this.wayRouteHandler(0);
      }

    })

    this.hinder_one.on(Laya.Event.CLICK, this, ()=>{
      AudioMudule.getInstance().play('btn');
      observer.publish("pop::instruct");
    })

    this.hinder_two.on(Laya.Event.CLICK, this, ()=>{
      observer.publish("hinder::tips")
    })

    this.hinder_three.on(Laya.Event.CLICK, this, ()=>{
       observer.publish("hinder::tips")
    })

    this.receivePenguin.on(Laya.Event.CLICK, this, ()=>{
       observer.publish("pop::rank", messageCenter, 3);

    })

  }

  // 终点位置(自动:随机的位置,手动:鼠标点击的位置)
  toPos(isAuto) {
    let posX, posY, stageX, stageY;

    if(isAuto){
        let pos = this.randomPenguinPos(isAuto);
        posX = pos.stage_x;
        posY = pos.stage_y;

    }else{
        posX = this.posX;
        posY = this.posY- Math.ceil(Laya.stage.height/750*210);
    }

    return{posX, posY}
  }

  // 路径算法、

  wayRouteHandler(isAuto) {
    if(!this.goPenguin){
      console.log("没有取到企鹅类型");
      this.errorHandler();
      return;
    }
    let posX, posY, stageX, stageY;
    let toPos = this.toPos(isAuto);

    posX = toPos.posX;
    posY = toPos.posY;

    let from = {x: Math.floor(this.digPenguin.x)-57 , y: Math.floor(this.digPenguin.y)},             //起点
        to =   {x: posX-57, y: posY},                //终点
        base = 3.5;

    this.wayroute = PenguinWalk(from ,to);        //路径

    this.isGameing = true;
    if(this.wayroute.length>0){
      let _direction = [];
      // this.goPenguin.play('normal', true);
      let loopMove = ()=>{

          let firstWay = this.wayroute.splice(0,1),
              direction = firstWay[0].d,
              _x = firstWay[0].x+57,
              _y = firstWay[0].y;

          AudioMudule.getInstance().play('run');
          if(_direction.includes(direction)){
          }else{
              _direction.push(direction);
              this.goPenguin.play(`${direction}`, true);
          }

          // 方向处理
          let routerHandler = ()=>{
              if( this.wayroute.length > 0 ){
                  loopMove();
              }else if(this.wayroute.length === 0 &&  this.isGameing){
                  this.goPenguin.play('dig', false);
                  AudioMudule.getInstance().play(`dig_${this.type}`,2);
                  console.log("到达目的地，挖坑");
                  this.DigKeng(_x, _y);
              }
          }

          //定时器处理
         /* let arrD = ['lu', 'ru','ld', 'rd'];
          arrD.forEach( (item)=>{
             if(item == direction){timer = 70;}else{timer = 50}    //斜着走时间：50*1.4
          })*/
         /* if(direction == 'lu' || direction== 'ru' ||  direction== 'ld' ||  direction== 'rd'){base= 0.55;
          }else{base= 0.5;}*/

          let timerHandler = ()=>{
              Laya.timer.once(1000/60, null, ()=>{
                router();
              })
          }

          // 行走方向
          let router =()=>{

            switch (direction) {
                case 'u':
                      this.digPenguin.y -= base;
                      if(this.digPenguin.y <= _y ){
                          routerHandler();
                      }else{
                          timerHandler();
                      }
                break;

                case 'r':
                      this.digPenguin.x += base;
                      if(this.digPenguin.x >= _x ){
                          routerHandler();
                      }else{
                        timerHandler();
                      }
                break;

                case 'd':
                      this.digPenguin.y += base;
                      if(this.digPenguin.y>= _y ){
                        routerHandler();
                      }else{
                        timerHandler();
                      }
                break;

                case 'l':
                      this.digPenguin.x -= base;
                      if(this.digPenguin.x <= _x ){
                        routerHandler();
                      }else{
                        timerHandler();
                      }
                break;

                case 'lu':
                      this.digPenguin.x -= base;
                      this.digPenguin.y -= base;
                      if(this.digPenguin.x <= _x){
                        routerHandler();
                      }else{
                        timerHandler();
                      }
                break;

                case 'ru':
                      this.digPenguin.x += base;
                      this.digPenguin.y -= base;
                      if(this.digPenguin.x >= _x){
                        routerHandler();
                      }else{
                        timerHandler();
                      }
                break;

                case 'ld':
                      this.digPenguin.x -= base;
                      this.digPenguin.y += base;
                      if(this.digPenguin.x <= _x){
                        routerHandler();
                      }else{
                        timerHandler();
                      }
                break;

                case 'rd':
                      this.digPenguin.x += base;
                      this.digPenguin.y += base;
                      if(this.digPenguin.x >= _x){
                        routerHandler();
                      }else{
                        timerHandler();
                      }
                break;
            }
          }
          router();
      }
      AudioMudule.getInstance().play('runbeak');
      loopMove();

    }else{
      if(this.code !== 0) return;
      this.goPenguin.play('dig', false);
      this.DigKeng(posX, posY);
    }


  }

  // 开始下一局发送命令
  emit() {
    let user_input_text = BottomUIView.getInstance().config.user_input_text;
        observer.publish('game::start');
        console.log("手动挖宝");
        if (this.code === 0) {
          messageCenter.emit('bet', { amount: user_input_text, isAuto: 0 });
        }
  }

  gemeStart() {
    // console.log("不用延迟处理");
     // Laya.timer.loop(1000, this, this.addLoadingTimeHandler);
  }

  errorHandler() {
     let reload = () => { window.location.reload() };
        observer.publish('common::tips', '信号不好，请稍后重试~', reload , reload);
        return;
  }

  addLoadingTimeHandler() {
     this.loadingTime++;
       // 时间过久
      if (this.loadingTime > 15) {
        this.errorHandler();
      }

  }

  // 挖坑
  DigKeng(posX,posY) {
    this.movingEnd = true;


    let delay = false;

    let sizeKeng = {
            x: posX,
            y: posY+5,
            anchorX: 0.5,
            anchorY: 0
    }
    if(this.type === 3){
      sizeKeng.y = posY + 15;
    }
    let kengAni = createSkeleton('images/animate/keng');
    this.addChildAt(kengAni, 1);
    kengAni.set(sizeKeng);
    kengAni.play(`keng_dig_${this.type}`, false);

    kengAni.once(Laya.Event.STOPPED, this, ()=>{
      if(this.result_data.length > 0 && this.code ===0 && !delay){
        delay = true;
        this.treasurePos.push({x:posX, y:posY});   //宝藏的位置
        this.betHandler();
      }

      Laya.timer.once(400, this, ()=>{
        if(this.result_data.length > 0 &&  this.code ===0 && !delay){
            delay = true;
            this.treasurePos.push({x:posX, y:posY});   //宝藏的位置
            this.betHandler();
        }
        kengAni.play(`keng_stuff_${this.type}`, false);
        kengAni.once(Laya.Event.STOPPED, this, ()=>{
          if(this.result_data.length > 0 && this.code ===0 && !delay){
               delay = true;
              this.treasurePos.push({x:posX, y:posY});   //宝藏的位置
              this.betHandler();
          }
          kengAni.destroy();
        })

      })
    });

  }


 // 结果过来了
  resultCome(data) {
 /*   let data ={
      "cmd": "bet",
      "code": 5,
      "res": {
          "winAmount": 15,
          "queenAmount": 0,
          "subAmount": 15,
          "trigger": 0,
          "list": [
              {
                  "name": "黑铁",
                  "amount": 5,
                  "cnt": 3,
                  "no": 2
              }
          ]
      }
    }*/
    this.code = Number(data.code);
    this.result_data.push(data.res);

    this.loadingTime = 0;

    // 错误处理
    if (CommonGameModule.getInstance().errorHandler(data)) {
        console.log("返回错误code码");
        observer.publish('walk::stop');
        observer.publish('game::reset');
        return;
    };

    // 投币成功
    observer.publish('bet::success');

  }

  betHandler() {
      let treasurePos = this.treasurePos[0];
      let dataResult = this.result_data[0];

      this.isClick = false;
      this.treasurePos.splice(0, 1);

      if(dataResult.winAmount > 0){
          this.winAmountHandler(dataResult , treasurePos);
      }else{
            // 没有中奖调一下
          CommonGameModule.getInstance().jiujijin();
          this.nowinHandler();
      }
      this.nextDig();
  }

  //没有中奖的企鹅表情
  nowinHandler() {
      let random = Math.random() ;
      // let random = 0.4 ;
        if(!this.isClick){
          if(random >= 0.3 && random<0.4){
            AudioMudule.getInstance().play('bian');
            this.goPenguin.play('cry_2', true);    //愤怒
          }else if(random >= 0.4 && random<0.5){
            AudioMudule.getInstance().play('zha');
            this.goPenguin.play('zha', true);    //被炸
          }else{
            this.goPenguin.play('cry_1', true);    //难过
          }
        }

        this.dom_receive.play("cry", true);

        // this.result_data.splice(0, 1);
        Laya.timer.once(1000, this, ()=>{
            this.gameNext(true);
        });
  }

  //中奖金额分配展示
  winAmountHandler(dataResult , treasurePos) {
    // let _dataResult = dataResult ;
    let amountList   = dataResult.list;

    if(dataResult.subAmount > 0){
      let time = 0;

      for(let i = 0 ; i < amountList.length ; i++){
        let cnt = amountList[i].cnt;
        let num = amountList[i].no ;
        let amount = amountList[i].amount ;

        for (let j = 0; j < cnt; j++){  // 个数大于1
          let isReceive = (j == cnt-1 && i == amountList.length-1) ? 1 : 0;
          setTimeout(()=>{
              this.singleAmountHandler(dataResult , num,amount, treasurePos, isReceive);
           }, time*280);
           ++time;
        }

      }
    }else{
        this.queenHandler(dataResult, treasurePos);
    }

    AudioMudule.getInstance().play('receive');
    this.dom_receive.play("happy",true);

    if(!this.isClick){
      this.goPenguin.play('happy', true);    //开心
    }

  }

  queenHandler(dataResult , treasurePos) {
    let _x = treasurePos.x;
    let _y = treasurePos.y-180;

    let queenAmount = dataResult.queenAmount;

    if(queenAmount >0 ){
        let crownAni = createSkeleton('images/animate/win_queen');  //图案
        let sizeCrown = {
              scaleX:0,
              scaleY:0,
              x: treasurePos.x,
              y: treasurePos.y - 10
        }
        crownAni.set(sizeCrown);
        this.addChild(crownAni,1);
        crownAni.play("light", false);
        Laya.Tween.to(crownAni, {scaleX:1, scaleY:1, x:_x,  y:_y},500, Laya.Ease.backOut, Laya.Handler.create(this, ()=>{
            Laya.timer.once(800, this, ()=>{
                crownAni.destroy();
                if(dataResult.subAmount ===0 ){
                  console.log("没有宝藏，才发布");
                  observer.publish("pop::queen", queenAmount, ()=>{this.gameNext()});
                  messageCenter.emitAjax('userAccount');
                }
            })
        }));
    }
  }

  //单个中奖图案处理
  singleAmountHandler(dataResult, num, amount, treasurePos, isReceive) {
    let _num = num,
        _amount = amount;

    let amountBox =  new Laya.Box();
    let sizeBox = {
      width: 150,
      height: 80,
      anchorX:0.5,
      scaleX:0,
      scaleY:0,
      x: treasurePos.x,
      y: treasurePos.y - 160
    }

    amountBox.set(sizeBox);

    let singleAmount = new Laya.Label();  //单价
    let sizeSingleAmount = {
      height: 30,
      centerX: 0.5,
      y:85,
      font: "Arial",
      fontSize :28,
      color:"#964a00",
      bold: true
    }

    singleAmount.set(sizeSingleAmount);
    let sizeSingleAni = {
        centerX: 0.5,
        y: 20
    }
    let singleAni = new Laya.Image();   //图案
    singleAni.skin = `images/room/win_${_num}.png`;
    singleAni.set(sizeSingleAni);

    singleAmount.text = '+'+amount;
    amountBox.addChild(singleAmount);
    amountBox.addChild(singleAni);
    AudioMudule.getInstance().play('win');
    this.addChild(amountBox);
    this.singleShow(dataResult , amountBox, singleAni, singleAmount, treasurePos, isReceive);
  }

  //单个中奖图案弹出动效
  singleShow(dataResult , amountBox, singleAni, singleAmount, treasurePos, isReceive) {
    let _amountBox = amountBox,
        _singleAni = singleAni,
        _singleAmount = singleAmount;

    let randomX , randomY , counter = 0;

    let _x = treasurePos.x;
    let _y = treasurePos.y-230;
    randomX = this.getRandom(_x-70, _x + 70);    //随机掉落位置x
    randomY = this.getRandom(_y, _y - 40);         //随机掉落位置y

    // 飞至接宝企鹅
    let singleFly = ()=>{
        setTimeout(() => {
            _singleAmount.visible = false;
            animate_bezier_move(_amountBox,{x:randomX, y:randomY},{x:1120,y:95},160,() => {
                _singleAni.visible = false;
                _amountBox.destroy();
            });

          if(isReceive){
            this.queenHandler(dataResult , treasurePos);
            this.receiveHandler(dataResult);
          }
        },350);
    }

    Laya.Tween.to(_amountBox, {scaleX:1, scaleY:1, x:randomX, y:randomY},100, Laya.Ease.backOut, Laya.Handler.create(this, singleFly));

  }

  // 接宝企鹅
  receiveHandler(dataResult) {
      let _dataResult = dataResult;
    // 处理企鹅话术
      let callback = ()=>{
          let random = Math.random() ;

          let cbQueen = ()=>{
              let queenAmount = _dataResult.queenAmount;
              if(queenAmount >0 ){
                  observer.publish("pop::queen", queenAmount, ()=>{
                    this.gameNext();
                  })
              }else{
                  this.gameNext();
              }
          }

          let cb = (_index)=>{
            // TODO:换成局部
              let talk = createSkeleton('images/animate/talk');   //说话
                talk.x = 1066;
                talk.y = 50;
                this.addChildAt(talk, 1);
                talk.zOrder = 1000;
                talk.visible = true;
                talk.play(`talk_${_index}`, false);
                Laya.timer.once(800, this, ()=>{
                  talk.visible = false;
                  cbQueen();
                })
          }

          if(random >= 0.2 && random<0.35){
            cb(1);
          }else if(random >= 0.35 && random<0.5){
            cb(2);
          }else if(random >= 0.5 && random<0.65){
            cb(3);
          }else{
            Laya.timer.once(800, this, ()=>{
              cbQueen();
            })
          }
      }

      //处理金额
      let totalAmount = new Laya.Label();                     //投币金额
      totalAmount.font = "new_font";
      totalAmount.x = 1138;
      totalAmount.y = 270;
      totalAmount.scaleX = 0;
      totalAmount.scaleY = 0;

      totalAmount.visible = false;
      totalAmount.text = '+'+ _dataResult.subAmount;
      if(dataResult.subAmount > 0) {
         totalAmount.visible = true;
      }

      this.addChild(totalAmount);
      totalAmount.zOrder = 999;
      Laya.Tween.to(totalAmount, {y: 220, scaleX:1, scaleY:1}, 400, Laya.Ease.backOut, Laya.Handler.create(this, ()=>{
        Laya.timer.once(600, this, ()=>{
          totalAmount.visible = false;
          totalAmount.scale(0,0);
        })
        messageCenter.emitAjax('userAccount');
        callback();
      }));
  }

  // 游戏下一步
  gameNext(flag=false) {
      let bottom = BottomUIView.getInstance();
      observer.publish("game::stop");
      this.isComplete = true;
      // 当局结束
      this.isReset(flag);
      if (bottom.config.gameStatus === 'auto') {
        Laya.timer.once(800, null, ()=>{
          console.log("bottom.config.autoTimes", bottom.config.autoTimes);
          if(bottom.config.autoTimes !== 0){
            bottom.renderStartBtnStatus('auto', bottom.config.autoTimes);
          }else{
            bottom.renderStartBtnStatus('ready');
          }
        })

      }
  }

//游戏继续
  nextDig() {
      console.log("下一局挖宝");
      this.isGameing = false;
      this.movingEnd = false;
      this.isClick = false;
      this.wayroute = [];
      this.isComplete = true;

      this.result_data.splice(0, 1);
  }

  // 挖宝结束重置
  isReset(flag) {
    /*  if(!flag) {
        this.result_data.splice(0, 1);
      }*/
      if (this.code != 0) {
          this.isGameing = false;
          this.isClick = false;
          this.movingEnd = false;
          this.wayroute = [];
      }
      if (!this.isGameing && this.goPenguin) {
        this.goPenguin.play('normal', true);
      }
      this.dom_receive.play("normal", true);
      this.code = 0;
      this.isComplete = false; //一局游戏结束
      this.loadingTime = 0;
      Laya.timer.clear(this, this.addLoadingTimeHandler);
  }

}