// 公共模块
import { observer, messageCenter } from '../init_module';
import { ERROR_TEXT } from '../../config/data';
import UTILS from '../../config/utils.js';
import RoomScene from '../../uiScene/room';
import PenguinUIView from '../../uiScene/penguin';
import AudioMudule from './audio';
export default class CommonGameModule {
    constructor() {

        CommonGameModule.instance = this;
    }

    static getInstance() {
        return this.instance || new this();
    }

    registerAction(messageCenter, observer) {
        messageCenter.registerAction("losePointFreeze", this.losePointFreezeFn.bind(this)) // 输分禁用
        messageCenter.registerAction("losePointRemind", this.losePointRemindFn.bind(this)) // 输分提醒

        messageCenter.registerAction("userForbidden", this.userForbiddenFn.bind(this)) // 用户禁用
        messageCenter.registerAction("gameRepair", this.gameRepairFn.bind(this)) // 游戏维护
    }

    // 是否要显示返回按钮
    isShowBtnBackHandler(dom) {
        // Laya 返回按钮
        if (window.GM && GM.isCall_out === 1 && GM.isShowBtnBack_out && GM.btnBackCall_out) {
            dom.visible = true; // 显示返回按钮
            dom.on(Laya.Event.CLICK, null, GM.btnBackCall_out);
        }
    }

    // 是否要显示home主页按钮
    isShowBtnHomeHandler(dom) {
        if (GM.backHomeUrl) {
            // 显示按钮
            dom.visible = true;
            // 绑定事件
            dom.on(Laya.Event.CLICK, null, () => { location.href = GM.backHomeUrl; });
        }
    }

    // 系统公告
    noticeSystem(menu_box, height) {
        let btn_notice = menu_box.getChildByName('btn_notice');
        let dom_red = btn_notice.getChildByName('red');
        let dom_notice = btn_notice.getChildByName('notice');
        let noticeCallBack = (data = {}) => {
            // 是否显示系统公告
            if (!data.isShowNotice) {

                return;
            }

            // 是否需要显示小红点
            if (data.isShowRedPoint) {
                // 显示小红点
                dom_red.visible = true;
            }

            btn_notice.on(Laya.Event.CLICK, this, () => {
                // 直接隐藏小红点
                dom_red.visible = false;
                dom_notice.visible = false;
                menu_box.visible = false;
                menu_box.getChildByName('bg').height = 185;
                AudioMudule.getInstance().play('btn');
                GM.noticePopShow_out && GM.noticePopShow_out();
            });

            // 显示出公告按钮
            btn_notice.visible = true;
            dom_notice.visible = true;
            // 长背景
            menu_box.getChildByName('bg').height = height;
        }

        if (window.GM && GM.isCall_out === 1 && GM.noticeStatus_out) {
            GM.noticeStatus_out(noticeCallBack);
        }
    }

    // 默认提示押注额提示
    defaultInputNotice(n1, n2) {
        let total = Math.max(n1, n2);
        let result;
        let isAdd = false; //是否进位
        if (total < 100) {
            result = 10;
        } else if(total >=100 && total < 10001){
            result = 100;
        } else {
            result = Math.ceil(total / 100);

            // 先转字符串
            result = String(result);
            for (let i = 1, l = result.length; i < l; i++) {
                if (result[i] !== '0') {
                    isAdd = true;
                }
            }
            result = isAdd ? Number(result[0]) + 1 + result.slice(1).replace(/\d/g, '0') : result;
        }

        // 最后转数字
        result = Number(result);
        result = result > 500000 ? 500000 : result;

        return result;

    }
      // 停止游戏
    stopGame(text) {
        let penguin = PenguinUIView.getInstance(),
        isComplete = penguin.isComplete;
        if(isComplete){
            console.log("完成一局重置");
            observer.publish('walk::stop');
            observer.publish('game::reset');
            observer.publish('common::tips', text);
        }else{
            console.log("没完成，延迟4秒重置");
            Laya.timer.once(4000, this, ()=>{
                observer.publish('walk::stop');
                observer.publish('game::reset');
                let clearTimer =()=>{
                    console.log("清空定时器");
                     Laya.timer.clear(this, this.stopGame);
                }
                observer.publish('common::tips', text, clearTimer, clearTimer);
            })
        }

    }
    // 输分提醒
    losePointRemindFn(data) {
        let losePL = data.res;
        let _level = losePL.level;
        if (_level === 2 || _level === 3) {
            console.log("输分禁用");
            let text = `您的输分金额已达上限，故账户禁用开始时间：${losePL.beginTime}，禁用结束时间：${losePL.endTime}`;
            this.stopGame(text);
            // observer.publish('common::tips', text);

        }else if(_level === 1){
            console.log("输分提醒");
            observer.publish('common::tips', '今天输分金额即将达到上限，注意休息...');
        }
    }

    // 黑名单输分禁用
    losePointFreezeFn(data) {
        let text = '客官，您已被输分禁用，请联系客服！';
        this.stopGame(text);
        // observer.publish('common::tips', text);
    }

    // 用户禁用
    userForbiddenFn(data) {
        let text = '客官，您的账号已被禁用，请联系客服！';
        this.stopGame(text);
        // observer.publish('common::tips', text);
    }

    // 游戏维护
    gameRepairFn(data) {
        let reload = () => window.location.reload();
        let text = '游戏维护中，请刷新页面';
        observer.publish('common::tips', text ,reload ,reload);
    }

    //救济金
    jiujijin() {
        Laya.timer.once(3000, this, () => {
            if (window.GM && window.GM.socket_RJ && window.GM.socket_RJ.exec) {
                // 延时确保服务器那边有了
                window.GM.socket_RJ.exec();

                // 更新余额
                messageCenter.emitAjax("userAccount");

            }
        })
    }

    // 错误处理
    errorHandler(data) {
        let code = String(data.code);
        let text = '';
        let confirmCallBack = null;
        let cancelCallBack = null;

        // 接口返回正常直接返回
        if(code === '0'){
            return false;
        }

        let reload = () => window.location.reload();

        switch (code){
            // otp验证
            case '81':
                UTILS.otpCheckHandler();
                return;
                break;

            // 余额不足
            case '5':
                confirmCallBack = () => { observer.publish('pop::recharge'); }
                  // 更新余额
                messageCenter.emitAjax("userAccount");
                break;

            // 服务器开小差
            case '4':
                confirmCallBack = cancelCallBack = reload;
                break;
            // 地球信号不好
            case '7':
                confirmCallBack = cancelCallBack = reload;
                break;
            // 未登录
            case '1':
                confirmCallBack = cancelCallBack = UTILS.checkLoginStatus;
                break;
        }

        // 没有这项默认为31错误码
        if(!ERROR_TEXT.hasOwnProperty(code)){
            code = '7';
        }

        text = ERROR_TEXT[code];
        observer.publish('common::tips', text, confirmCallBack, cancelCallBack);

        return true;

    }
}
