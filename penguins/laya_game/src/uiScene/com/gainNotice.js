import UTILS from '../../config/utils';

export default class GainNoticeUIView extends gainNoticeUI {
    constructor() {
        super();

        this.init();

        GainNoticeUIView.instance = this;
    }

    static getInstance() {
        return this.instance || new this();
    }

    init() {
        // 数据集合
        this.noticeDate = [];

        this.y = 320;
    }

    enter(data) {
        Laya.timer.clear(this, this.show);
        this.noticeDate.push(data.commMsg);
        // 是否已经添加进舞台
        if (!this.parent) {
            Laya.timer.once(10*1000, this, this.show);
        }
    }

    // 渲染数据
    renderDate(name, amount, gameName) {
        this.domName.text = UTILS.getActiveStr(name);
        this.domAmount.text = UTILS.getActiveStr(amount);
        this.domGame.text = UTILS.getActiveStr(gameName);
    }

    show() {
        let data = this.noticeDate.shift();
        let during = 300;
        if(typeof data === 'undefined'){
            this.removeSelf();

            return;
        }
        this.renderDate(data.nickName, data.winAmount, data.gameName);
        this.x = -(this.width+20);
        Laya.stage.addChild(this);
        Laya.Tween.to(this, { x:10}, during, Laya.Ease.backOut, Laya.Handler.create(this, () => {
            Laya.Tween.to(this, { x: -(this.width+20)}, during, Laya.Ease.backIn, Laya.Handler.create(this, this.show), 1500);
        }));
    }
}
