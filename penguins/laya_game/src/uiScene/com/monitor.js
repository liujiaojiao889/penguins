
import { observer,messageCenter } from '../../module/init_module';
import {CommonTipsPopDialog} from '../../pop/com/commonPop';
export default class MonitorSet {

    static init() {

        let backTimer;

        Laya.Monitor.init();
        Laya.Monitor.onSleep = function() {
            Laya.timer.clearAll();

            // socket.passivityClose();
            messageCenter.disconnectSocket();
            let t = 0;

            Laya.timer.once(t, this, ()=> {
                // let reload = () => window.location.reload();
                let monitorReset = ()=>{
                  /*  observer.publish('walk::stop');
                    observer.publish('game::reset');*/
                    window.location.reload();
                }

                observer.publish('common::tips', '网络异常，请刷新界面...', monitorReset, monitorReset);
            });
        };

        Laya.Monitor.onBack = function() {
            backTimer = setTimeout(()=>{
                 // observer.publish('game::voice', false);
             }, 8000);
        };
        Laya.Monitor.onFront = function() {
            clearTimeout(backTimer);
        };

    }

}

