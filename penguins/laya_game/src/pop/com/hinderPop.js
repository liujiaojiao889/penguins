/*
 *  公共弹层
 */
export class HinderPopDialog extends hinderUI {
    constructor(...args) {
        super(...args);
        this.init();
    }

    init() {

        this.initConfig();
    }

    registerAction({ messageCenter, observer }) {

        // 订阅弹层出现
        observer.subscribe('hinder::tips', this.myShow.bind(this));
    }

    initConfig() {
        this.confirmCallBack = null; //确认回调
        this.cancelCallBack = null; //取消回调
    }

    myShow(txt, confirmCallBack, cancelCallBack) {

        this.confirmCallBack = confirmCallBack;
        this.cancelCallBack = cancelCallBack;

        // 需要取消回调
        if (cancelCallBack) {
            window.UIConfig.closeDialogOnSide = false;

        } else {
            Laya.timer.once(1500, this, this.myClose);
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

