/*
 *  公共弹层
 */
export class CommonTipsPopDialog extends commonPopTipsUI {
    constructor(...args) {
        super(...args);
        this.init();
    }

    init() {
        this.initDom();

        this.initConfig();

        this.initEvent();
    }

    registerAction({ messageCenter, observer }) {

        // 订阅弹层出现
        observer.subscribe('common::tips', this.myShow.bind(this));
    }

    initDom() {
        // 关闭按钮
        this.btn_close = this.getChildByName("close_btn");

        // 确定按钮
        this.btn_sure = this.getChildByName("btn_sure");

         // 确定按钮
        this.btn_cancle = this.getChildByName("btn_cancle");
    }

    initConfig() {
        this.config = {
            limitTime: false, //限制时间
            popBgHeight: 357,
            btnSureY: 246
        }

        this.confirmCallBack = null; //确认回调
        this.cancelCallBack = null; //取消回调
    }

    initEvent() {
        // 关闭按钮
        this.btn_close.on(Laya.Event.CLICK, this, () => {
            this.cancelCallBack && this.cancelCallBack();
            this.myClose();

        });

        // 确定关闭按钮
        this.btn_sure.on(Laya.Event.CLICK, this, () => {
            this.confirmCallBack && this.confirmCallBack();
            this.myClose();
        });

        // 取消按钮
        this.btn_cancle.on(Laya.Event.CLICK, this, () => {
            this.cancelCallBack && this.cancelCallBack();
            this.myClose();
        });

    }

    myShow(txt, confirmCallBack, cancelCallBack) {

        this.txt_content.text = txt;
        this.confirmCallBack = confirmCallBack;
        this.cancelCallBack = cancelCallBack;

        // 需要取消回调
        if (cancelCallBack) {
            window.UIConfig.closeDialogOnSide = false;

        } else {
            Laya.timer.once(5000, this, this.myClose);
        }

        this.popup();

    }

    myClose() {
        this.close();
        window.UIConfig.closeDialogOnSide = true;
        this.confirmCallBack = null;
        this.cancelCallBack = null;
        Laya.timer.clear(this, this, this.myClose);
    }

}

