/**
 *底部
 */

import UTILS from '../config/utils';
import GAME_CONFIG from '../config/config';
import { AUTOPLAY_TIMES, DEFAULT_AMOUNT } from '../config/data';
import HeaderUIView from './header';
import RoomScene from './room';
import PenguinUIView from './penguin';
import { messageCenter, observer } from '../module/init_module';
import OptionsUIView from './com/options';
import { clickOtherAreaHandler } from '../common/laya.custom';
import CommonGameModule from '../module/com/commonGameModule';
import AudioMudule from '../module/com/audio';


const CLICK = Laya.Event.CLICK;

export default class BottomUIView extends bottomUI {
    constructor() {
        super();
        this.init();

        BottomUIView.instance = this;
    }

    static getInstance() {
        return this.instance || new this();
    }

    init() {
        this.initDom();
        this.initConfig();
        this.initEvent();

        this.subscribe();

        this.keyBoardNumber = new window.Tools.KeyBoardNumber();

        this.auto_btn.play("start_normal",true);
    }

    // 订阅
    subscribe() {
        //游戏开始了
        observer.subscribe('game::start', this.gameStart.bind(this));
        // 投币成功
        observer.subscribe('bet::success', this.betSuccess.bind(this));
        // 投币额修改
        observer.subscribe('bet::inputamount', this.updateDomInput.bind(this));

        // 游戏重置
        observer.subscribe('game::reset', this.reset.bind(this));

        observer.subscribe('game::stop', this.gameStop.bind(this));

    }

    initConfig() {
        this.config = {
            gameStatus: 'ready', //游戏状态     'ready' 准备完毕, 'going' 游戏中, 'auto'自动玩中
            MIN_INPUT: 10,
            MAX_INPUT: 500000,
            base: 10,
            user_input_text: 10, //投币金额
            isAuto: 0, //是否是自动玩
            autoTimes: 0, // 自动玩的次数
            isFirst:true, //是第一次进来
        }
    }

    initDom() {
        // 选项列表的公共配置参数
        const options = {
            buttonUrl: "images/room/btn_bg.png",
            bgUrl: 'images/room/auto_bg.png',
            labelFont: 'auto'
        }

        // 添加自动次数玩选项表
        options.itemList = AUTOPLAY_TIMES;
        options.clickHandler = (i) => {
            if (this.checkEnoughBet()) {
                // AudioMudule.getInstance().play('btn_start');
                this.renderStartBtnStatus('auto', i);
            }
        };
        this.autoplay_box.addChild(new OptionsUIView(options));

    }

    initEvent() {
        // 减法加法按钮
        this.btn_sub.on(CLICK, this, this.addSubHandler.bind(this, 'sub'));
        this.btn_add.on(CLICK, this, this.addSubHandler.bind(this, 'add'));

        // 最大按钮
        this.btn_max.on(CLICK, this, this.maxHandler);

        // 投币输入框
        this.btn_input.on(CLICK, this, () => {
            // 游戏进行中判断
            if (this.btnDisAble()) return;
            AudioMudule.getInstance().play('btn');
            this.showKeyBoardNumber();
        });

        //充值
        this.btn_recharge.on(CLICK, this, ()=>{
            // 未登录
            if (UTILS.willGotoLogin()) return;
             // 游戏进行中判断
            // if (this.btnDisAble()) return;
            AudioMudule.getInstance().play('btn');
            observer.publish("pop::recharge", messageCenter);
        })

        // 自动玩
        this.btn_auto.on(CLICK, this, this.showAutoPlay);

        // 点击其它区域菜单隐藏
        clickOtherAreaHandler(this.btn_auto, this.autoplay_box);
    }



    // 渲染自动玩按钮的状态
    renderStartBtnStatus(type, i) {
        switch (type) {
            case 'ready':
                 this.auto_btn.play('start_normal', true);
                break;

            case 'going':

                this.autoplay_box.getChildAt(0).hide();
                this.auto.visible = false;
                this.dom_auto.text = 0;
                this.config.isAuto = 0;
                this.config.autoTimes = 0;
                this.auto_btn.play('start_normal', true);

                break;

            case 'auto':
                this.config.isAuto = 1;
                this.config.autoTimes = Number(i) - 1;
                this.dom_auto.text = this.config.autoTimes;
                this.auto.visible = true;
                this.auto_btn.play('stop_normal', true);
                this.emitAuto();
                observer.publish("walk::handler", 1);
                // 最后一次自动玩
                if (this.config.autoTimes === 0) {
                    this.renderStartBtnStatus('going');
                    return;
                }
                break;
        }
        this.config.gameStatus = type;
    }

    //弹层自动玩
    showAutoPlay() {
        let penguin = PenguinUIView.getInstance(),
        gameing = penguin.isGameing,
        isClick = penguin.isClick,
        isComplete = penguin.isComplete;

        console.log(gameing, isClick,isComplete);

        if(gameing && this.config.gameStatus !== 'auto') {
            return;
        }

        if(isClick && this.config.gameStatus !== 'auto') {
            return;
        }
        if(isComplete && this.config.gameStatus !== 'auto'){
            return;
        }

        switch (this.config.gameStatus) {
            case 'ready':
                AudioMudule.getInstance().play('btn');
                this.auto_btn.play("start_click",false);
                this.autoplay_box.getChildAt(0).toggle();
                this.auto_btn.once(Laya.Event.STOPPED,this, ()=>{
                    this.auto_btn.play("start_normal",true);
                })

                break;

            case 'going':
                console.log('游戏进行中不可点...');
                break;

            case 'auto':
                AudioMudule.getInstance().play('btn');
                this.renderStartBtnStatus('going');
                // this.config.gameStatus = "ready";
                break;
        }

    }

    // 开始下一局发送命令
    emitAuto() {
        observer.publish('game::start');
        messageCenter.emit('bet', { amount: this.config.user_input_text, isAuto: this.config.isAuto });
    }

    //判断是否用铁,银,金色的锤子
    checkHammerType(num) {
        let i = 0,
            toubi =num || Number(this.config.user_input_text);
        if(toubi >= 10 && toubi < 1000) {
            i = 0;
        }else if (toubi >= 1000 && toubi < 10000) {
            i = 1;
        }else if (toubi >= 10000 && toubi < 100000) {
            i = 2;
        }else if (toubi >= 100000 && toubi <= 500000) {
            i = 3;
        }
        this.hammer.index = i;

         observer.publish("check::hammer", i);
    }

    // 投币成功
    betSuccess() {
        // 更新用户余额
        observer.publish('update::useraccount', -1 * this.config.user_input_text);

        // 设置默认投币额
        UTILS.setCookie("defaultBet" + GM.gameId + GM.user_id, this.config.user_input_text);
    }



        // max最大值按钮
    maxHandler() {

         // 未登录
        if (UTILS.willGotoLogin()) return;
        // 游戏进行中判断
        if (this.btnDisAble()) return;

        AudioMudule.getInstance().play('btn');
        let header = HeaderUIView.getInstance();
        let current = Math.max(header.config.yuNum, header.config.tingDou);
        if(current >= 100){
            current = current - current % 100;
        }else{
             current = current - current % 10;
        }

        current = Math.max(current, this.config.MIN_INPUT);
        current = Math.min(current, this.config.MAX_INPUT);

        this.btn_max.disabled = true;

        this.updateDomInput(current);
    }

    // 减法加法
    addSubHandler(type) {
         // 未登录
        if (UTILS.willGotoLogin()) return;
        // 游戏进行中判断
        if (this.btnDisAble()) return;
        AudioMudule.getInstance().play('btn');
        let config = this.config;
        let current = UTILS.addSubHandler(type, config.base, config.MIN_INPUT, config.MAX_INPUT, config.user_input_text);

        this.btn_max.disabled = false;
        this.updateDomInput(current);
    }

    // 修改投币金额
    updateDomInput(num) {
        let _num = Number(num) || this.config.MIN_INPUT;
            this.input_txt.text = _num;
            this.config.user_input_text = _num;

            if (_num === this.config.MIN_INPUT) {
                this.btn_sub.disabled = true;
            } else {
                this.btn_sub.disabled = false;
            }

            if (_num === this.config.MAX_INPUT) {
                this.btn_add.disabled = true;
                this.btn_max.disabled = true;
            } else {
                this.btn_add.disabled = false;
                this.btn_max.disabled = false;
            }
        this.checkHammerType(_num);
    }


    // 判断余额是否投币
    checkEnoughBet() {
        // 未登录
        if (UTILS.willGotoLogin()) return;

        let header = HeaderUIView.getInstance();
        let yuNum = header.config.yuNum;
        let tingDou = header.config.tingDou;
        let bet = this.config.user_input_text;
        let bool = GAME_CONFIG.localStatus || yuNum >= bet || tingDou >= bet;
        if (!bool) {
            // 更新余额
            messageCenter.emitAjax("userAccount");  //防止用户在别处游戏带入金额后，又带出的情况
            observer.publish('common::tips', '余额不足，请充值...', () => observer.publish('pop::recharge'));
        }

        return bool;

    }
    // 显示键盘
    showKeyBoardNumber() {
        this.keyBoardNumber.enter('', {
            length: 8,
            close: this.hideKeyBoardNumber.bind(this),
            input: null
        });
    }

    // 键盘退出
    hideKeyBoardNumber(type, value) {
        let initVal;
        if (value >= 100){
            initVal =value - value % 100;
         }else if(value <100){
            initVal =value - value % 10;
         }

        if (type === "confirm" && initVal) {
            this.btn_sub.disabled = false;
            this.btn_add.disabled = false;
            if(initVal <= this.config.MIN_INPUT){
                this.input_txt.text = this.config.MIN_INPUT;
                this.updateDomInput( this.input_txt.text);

                this.btn_sub.disabled = true;
                 this.btn_add.disabled = false;
                this.btn_max.disabled = false;

            }else if(initVal > this.config.MAX_INPUT) {
                observer.publish('common::tips', '超出最大投币额');
                this.input_txt.text = this.config.MAX_INPUT;
                this.updateDomInput( this.input_txt.text);

                this.btn_add.disabled = true;
                this.btn_max.disabled = true;
                this.btn_sub.disabled = false;

            }else{
                this.input_txt.text = initVal;
                 this.updateDomInput( initVal);
            }

        }else if(type === "confirm" && !initVal){
            this.input_txt.text = this.config.user_input_text;
        }

    }
    // 游戏进行中 按钮不可点
    btnDisAble() {
/*        let bool = this.config.gameStatus !== 'ready';
        if (bool) {
            console.log('不可点...');
        }

        return bool;*/

        let gameing = PenguinUIView.getInstance().isGameing;
        if(gameing) {
            console.log("游戏进行中，押注按钮不可点击");
        }
        return gameing;
    }

    gameStart() {
       this.config.gameStatus = 'going';
    }
    gameStop() {
        let bool =  this.config.gameStatus === 'auto' ? true : false;
        if(bool) return;
        this.config.gameStatus = 'ready';
    }

    reset() {
        this.renderStartBtnStatus('ready');
        this.config.isAuto = 0;
        this.config.autoTimes = 0;
        this.config.isFirst = true;
        this.auto.visible = false;
    }

}
