/**
 * 女王
 */
import AudioMudule from '../../module/com/audio';
import { createSkeleton } from '../../common/laya.custom';
import UTILS from '../../config/utils';
export class QueenDialog extends queenUI{
    constructor(...args){
        super(...args);

        this.createAnimate();
        this.initEvent();

    }


    // 注册
    registerAction({messageCenter,observer}) {
        // 订阅弹层
        observer.subscribe('pop::queen', this.myShow.bind(this));
    }

    initEvent() {
        this.btn_close.on(Laya.Event.CLICK, this, ()=>{
            this.myClose();
        })
    }

    createAnimate(){
        let skeletonPos = { x: 583, y: 341 };

        // 创建骨骼动画
        this.skeleton_queen = createSkeleton('images/animate/queen');
        this.skeleton_queen.set(skeletonPos);
        this.addChildAt(this.skeleton_queen, 0);
    }

     // 动态渲染
    renderAni() {
        let dom_amount = this.queenAmount;
        dom_amount.scaleX = 5;
        dom_amount.scaleY = 5;
        dom_amount.alpha = 0;
        Laya.Tween.to(dom_amount, {scaleX:1, scaleY:1, alpha: 1}, 800, Laya.Ease.backIn);

        let dom_close = this.btn_close;
        dom_close.scaleX = 5;
        dom_close.scaleY = 5;
        dom_close.alpha = 0;
        Laya.Tween.to(dom_close, {scaleX:1, scaleY:1, alpha: 1}, 800, Laya.Ease.backIn);
    }

     // 赢取金额，投币金额，动画完成的回调
    myShow(win_amount, callBack) {
        AudioMudule.getInstance().play('queen');
        this.renderAni();

        this.callBack = callBack;

        this.skeleton_queen.play("queen",false);

        this.queenAmount.text = Number(win_amount);

        this.popup();
        Laya.timer.once(3000, this, this.myClose);
    }

    myClose() {
        this.skeleton_queen.stop();
        this.skeleton_queen.offAll();
        this.callBack && this.callBack();
        this.callBack = null;
        Laya.timer.clear(this, this.close);

        this.close();
    }

}