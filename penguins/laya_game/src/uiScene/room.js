import { observer, setViewCenter, messageCenter } from '../module/init_module';
import UTILS from '../config/utils';
import HeaderUIView from './header';
import BottomUIView from './bottom';
import PenguinUIView from './penguin';
import GainNoticeUIView from './com/gainNotice';
import CommonGameModule from '../module/com/commonGameModule';
import AudioMudule from '../module/com/audio';
import MenuUIView from './com/menu';
import { createSkeleton } from '../common/laya.custom';

// 房间
export default class RoomScene extends roomUI {
    constructor(messageCenter) {
        super();

        this.sceneName = 'roomScene';
        this.init(messageCenter);
        RoomScene.instance = this;
    }

    static getInstance(messageCenter) {
        return this.instance || new this(messageCenter);
    }

    init(messageCenter) {
        //  setTimeout(function(){
        //     console.log("确定代码更新uuuuuuuuu");
        //     let reload = () => window.location.reload();
        //     observer.publish('common::tips', '是是是是是是网络异常，请刷新界面！', reload, reload);
        // },2000);
        // 声音模块
        AudioMudule.getInstance().initResource();
        AudioMudule.getInstance().play('bg');
        // MenuUIView.getInstance();


        this.initEvent();
        this.listenSocketRJ();

        // 配置数据
        this.isGameing = false; //是否游戏中
        this.tips = true ; //新手引导提示

         // 头部
        this.top_box.addChild(HeaderUIView.getInstance());

        // 游戏区域
        this.game_box.addChild(PenguinUIView.getInstance());

        // 底部
        this.bottom_box.addChild(BottomUIView.getInstance());

        this.menu_box.addChild(MenuUIView.getInstance());


        this.game_box.height = Math.floor(Laya.stage.height/750*370);
        this.game_box.y = Math.floor(Laya.stage.height/750*210);
        this.btn_instruct.y  = Math.floor(Laya.stage.height/750*120);


        //订阅场景加载事件，请注意bind方法似乎会改变function，导致取消订阅的时候判断的回调函数和绑定的回调函数不相同
        observer.subscribe(this.sceneName + "_enter", this.onEnter.bind(this));
        messageCenter.registerAction("initGame", this.initGame.bind(this));
         messageCenter.registerAction("tip", this.tip.bind(this));

        observer.subscribe('pop::newguide', this.newGuide.bind(this));
        // 用户余额
        messageCenter.registerAction("userAccount", (data) => {
            HeaderUIView.getInstance().renderUserAccount(data);
        });

        // 服务端主动推送，更新福袋金额
        messageCenter.registerAction("fudai", this.renderFudaiAmount.bind(this));
        observer.subscribe('fudai::update', this.fudaiUpdate.bind(this));

        CommonGameModule.getInstance().registerAction(messageCenter, observer);

        // observer.subscribe('game::start', this.gameStart.bind(this));
        // observer.subscribe('game::stop', this.gameStop.bind(this));
        observer.subscribe('game::reset', this.isReset.bind(this));

    }

    onEnter() {
        // 视图居中
        setViewCenter();

        UTILS.log(this.sceneName + " enter");

        //取消订阅时不用传递回调函数
        observer.unsubscribe(this.sceneName + "_enter");

        this.dispatchAction();
        // 必须等到初始化游戏拿到数据后再去更新用户默认投币额
        // 是否登录
        if (UTILS.checkLoginStatus()) {
            // 用户余额
            messageCenter.emitAjax('userAccount');
        } else {
            observer.publish('bet::inputamount');
        }
    }

    listenSocketRJ() {        //大奖播报
        if(window.GM && GM.socket_RJ && GM.socket_RJ.listen){
            GM.socket_RJ.listen('dajiangbobao', function(data) {  GainNoticeUIView.getInstance().enter(data); }, this);
        }
    }

    // 触发
    dispatchAction() {
        messageCenter.emit("initGame");
    }

    initEvent() {

        this.btn_fudai.on(Laya.Event.CLICK, this, (e)=>{
            // 游戏进行中判断
            // if (this.btnDisAble()) return;
             AudioMudule.getInstance().play('btn');
            observer.publish("pop::fudai");

        })

        this.btn_instruct.on(Laya.Event.CLICK, this, ()=>{
             // 游戏进行中判断
            // if (this.btnDisAble()) return;
             AudioMudule.getInstance().play('btn');
            observer.publish("pop::instruct");
        })

        // 点击其它区域菜单隐藏
        Laya.stage.on(Laya.Event.CLICK, this, (event) => {
            if (!event) {
                return;
            }
            let _target = event.target;
            let child = this.menu_box.getChildAt(0);
            let header = HeaderUIView.getInstance();

            // 菜单栏
            if (child && child.visible  && _target !== header.btn_more && !this.menu_box.contains(_target)) {
                child.visible = false;
            }
        });

        Laya.stage.on('resize', this, function(){
            this.monitorHeight();
        });

    }
    initGame(data) {
        let amount = data.res.amount;
        this.fudai_amount.text = UTILS.addThousandSymbol(amount);

        this.tips = data.res.tip;
        this.newUser = data.res.isNew;
    }

    // 处理福袋数据
    renderFudaiAmount(data) {

        let dom = this.fudai_amount;
        let target = Number(data.res);
        let currentNum =this.fudai_amount.text;
        currentNum = Number(currentNum.replace(/,/g, ''));
        let step = Math.max(1, Math.floor(target * 2 / 300));

        let loop = () => {
            currentNum += step;
            if (currentNum >= target) {
                currentNum = target;
            } else {
                Laya.timer.frameOnce(2, null, loop);
            }
            dom.text = UTILS.addThousandSymbol(currentNum);
        }
        loop();
    }

    // 更新福袋金额
    fudaiUpdate(data) {
        this.fudai_amount.text  = UTILS.addThousandSymbol(data.amount);
    }

    monitorHeight(_num) {
        let penguin = PenguinUIView.getInstance();
        this.areaHeight = Math.floor(Laya.stage.height/750*370);
        this.areaY = Math.floor(Laya.stage.height/750*210);

        // 游戏区域
        // PenguinUIView.getInstance().penguinArea = this.areaHeight;
        penguin.height =this.areaHeight;
        penguin.area.height = this.areaHeight;
        penguin.digArea.height =  this.areaHeight;

        this.game_box.height =  this.areaHeight;
        this.game_box.y =this.areaY;
        this.btn_instruct.y  = Math.floor(Laya.stage.height/750*120);

        // 新手引导区域
        if(!this.guideContainer && !this.tips){
            this.guideContainer = new Laya.Sprite();
            this.guideContainer.cacheAs = "bitmap";
            this.addChild(this.guideContainer);

            this.maskArea= new Laya.Sprite();
            this.guideContainer.addChild(this.maskArea);


            this.interactionArea = new Laya.Sprite();              //挖宝区域
            this.interactionArea.blendMode = "destination-out";
            this.maskArea.addChild(this.interactionArea);

            this.interactionArea.graphics.clear();

            this.betArea  = new Laya.Sprite();                   //投币区域
            this.betArea.blendMode = "destination-out";
            this.maskArea.addChild(this.betArea);
            this.betArea.graphics.clear();

            this.tips_bet = new Laya.Image();                     //默认投币
            this.tips_bet.skin = 'images/room/guide_two.png';
            this.tips_bet.x = 450;
            this.tips_bet.y = Math.floor(Laya.stage.height-230);
            this.guideContainer.addChild(this.tips_bet);

            this.bet_num = new Laya.Label();                     //投币金额
            this.bet_num.font = "guide_font";
            this.bet_num.x = 590;
            this.bet_num.y = Math.floor(Laya.stage.height-168);
            this.bet_num.text = _num;
            this.guideContainer.addChild(this.bet_num);

            /*this.tips_des = new Laya.Image();                     //提示文案
            this.tips_des.skin = 'images/room/guide_one.png';
            this.tips_des.x = 915;
            this.tips_des.y = this.areaY-40;
            this.guideContainer.addChild(this.tips_des);*/

            this.tips_des2 = new Laya.Image();                   // 提示文案2
            this.tips_des2.skin = 'images/room/guide_five.png';
            this.tips_des2.x = 438;
            this.tips_des2.y = this.areaY+40;
            this.guideContainer.addChild(this.tips_des2);


            this.tips_today = new Laya.Image();                     //今日提示图案
            this.tips_today.skin = 'images/room/guide_three.png';
            this.tips_today.x = 970;
            this.tips_today.y = this.areaHeight + this.areaY + 10;
            this.guideContainer.addChild(this.tips_today);

            this.tips_check = new Laya.Image();                     //今日提示对勾
            this.tips_check.skin = 'images/room/guide_four.png';
            this.tips_check.x = 970;
            this.tips_check.y = this.areaHeight + this.areaY + 13;
            this.tips_check.visible = false;
            this.guideContainer.addChild(this.tips_check);

            this.guide_close = new Laya.Image();                     //关闭按钮
            this.guide_close.skin = 'images/pop/tips/close.png';
            this.guide_close.x = 1230;
            this.guide_close.y = this.areaY;
            this.guideContainer.addChild(this.guide_close);

            this.guide_start = new Laya.Image();                     //开始按钮
            this.guide_start.skin = 'images/room/guide_six.png';
            this.guide_start.x = 960;
            this.guide_start.y = this.areaHeight + this.areaY - 100;
            this.guideContainer.addChild(this.guide_start);

            this.guideHand = createSkeleton('images/animate/hand');   //引导手指
            this.guideContainer.addChildAt(this.guideHand, 1);
            this.guideHand.play('hand', true);
            this.guideHand.x = 530;
            this.guideHand.y = this.areaHeight -60;
        }

        if(this.guideContainer && !this.tips){

            this.guideContainer.width = Laya.stage.width;
            this.guideContainer.height = Laya.stage.height;
            this.maskArea.graphics.clear();
            this.maskArea.alpha = 0.7;
            this.maskArea.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");

             var  path =  [
                ["moveTo", 0, 0], //画笔的起始点，
                ["arcTo", 1100, 0, 1100, 30, 30],
                ["arcTo", 1100, this.areaHeight, 970, this.areaHeight, 30],
                ["arcTo", 0, this.areaHeight, 0, 340, 30],
                ["arcTo", 0, 0, 30, 0, 30],
            ];
            this.interactionArea.graphics.clear();
            this.interactionArea.graphics.drawPath(117, this.areaY, path, {fillStyle: "#ff0000"});

             let betAreaY = Math.floor(Laya.stage.height-100);

            var pathBet =  [
                ["moveTo", 0, 0],
                ["arcTo", 360, 0, 360, 45, 45],
                ["arcTo", 360, 90, 315, 90, 45],
                ["arcTo", 0, 90, 0, 45, 45],
                ["arcTo", 0, 0, 45, 0, 45],
            ];
            this.betArea.graphics.clear();
            this.betArea.graphics.drawPath(420, betAreaY, pathBet, {fillStyle: "#ff0000"});


             this.tips_bet.y = Math.floor(Laya.stage.height-230);
             this.bet_num.y = Math.floor(Laya.stage.height-168);
             // this.tips_des.y = this.areaY-40;
             this.tips_des2.y = this.areaY+40;
             this.tips_today.y = this.areaHeight + this.areaY + 10;
             this.tips_check.y = this.areaHeight + this.areaY + 13;
             this.guide_close.y = this.areaY;
             this.guideHand.y = this.areaHeight -60;
             this.guide_start.y = this.areaHeight + this.areaY - 100;
             penguin.digPenguin.y = Math.floor(Laya.stage.height/750*260);    //企鹅位置只在新手引导显示时才变动
        }

    }
    // 新手引导
    newGuide(_num) {

        this.monitorHeight(_num);
        this.newGuideCookie();
    }


    //设置新手引导cookie
    newGuideCookie() {

      /*  this.guideContainer.on(Laya.Event.CLICK, this, (e)=>{
             if(e.target ==  this.tips_today) return;
             this.guideContainer.destroy();
        });*/

        this.tips_today.on(Laya.Event.CLICK, this, ()=>{
            this.tips_check.visible ?  this.tips_check.visible = false :  this.tips_check.visible = true;

        });

        this.guide_close.on(Laya.Event.CLICK, this, (e)=>{
            if(this.tips_check.visible){
                messageCenter.emit("tip");

            }
            this.tips = true;
            this.guideContainer.removeSelf();

        });

        this.guide_start.on(Laya.Event.CLICK, this, (e)=>{
            if(this.tips_check.visible){
                messageCenter.emit("tip");

            }
            this.tips = true;
            this.guideContainer.removeSelf();

        });
    }

    tip() {
        console.log("不用弹新手引导");
    }

    // 游戏进行中 按钮不可点
    btnDisAble() {
        let bool = this.isGameing;
        if (bool) {
            console.log('游戏进行中,不可点...');
        }
        return bool;
    }
    // 开始游戏
    gameStart() {
        this.isGameing = true;
    }

    // 结束游戏
    gameStop() {
        this.isGameing = false;
    }

    // 异步优化
    myPromise(context, delay) {
        return new Promise((resolve, reject) => {
            Laya.timer.once(delay, context, resolve);
        })
    }

    onExit() {
        UTILS.log(this.sceneName + " exit");

        // 取消所有注册
        this.unRegisterAction();

        //发布退出事件
        observer.publish(this.sceneName + "_exit");

        this.clear();
    }

    isReset() {
        this.isGameing = false;
        this.tips = true;
    }

    //自定义方法，场景退出的时候是销毁还是removeSelf请自行抉择
    clear() {
        this.removeSelf();
    }

}
